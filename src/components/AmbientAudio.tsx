import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function AmbientAudio({ startPlaying }: { startPlaying: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Ghibli-esque pentatonic scale / lofi chord progression
  // Notes in Hz: C3 (130.81), E3 (164.81), G3 (196.00), B3 (246.94), C4 (261.63), E4 (329.63), G4 (392.00), A4 (440.00), B4 (493.88)
  const CHORDS = [
    [130.81, 196.00, 329.63, 392.00, 493.88], // Cmaj9 (C3, G3, E4, G4, B4)
    [174.61, 220.00, 349.23, 440.00, 523.25], // Fmaj9 (F3, A3, F4, A4, C5)
    [146.83, 220.00, 293.66, 392.00, 440.00], // G6/9 (G3, D4, G4, A4) - split root
    [164.81, 246.94, 329.63, 392.00, 493.88], // Em7 (E3, B3, E4, G4, B4)
  ];

  const playAmbientNote = (ctx: AudioContext, destination: AudioNode) => {
    // Pick a random chord and stagger notes for arpeggiator effect
    const chordIndex = Math.floor(Math.random() * CHORDS.length);
    const chord = CHORDS[chordIndex];
    
    // Play 3 to 4 notes from the chord with slight random delays
    chord.forEach((freq, index) => {
      // 70% chance to play each note to keep it organic and dynamic
      if (Math.random() > 0.3) {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        // Sine wave for clean piano-like base, soft triangle wave for warm overtones
        osc.type = Math.random() > 0.5 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Slight detune for cozy tape chorus effect
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime);

        const startTime = ctx.currentTime + (index * 0.15) + (Math.random() * 0.1);
        const duration = 2.5 + Math.random() * 1.5;

        noteGain.gain.setValueAtTime(0, startTime);
        // Soft attack
        noteGain.gain.linearRampToValueAtTime(0.06, startTime + 0.3);
        // Exponential decay / release
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(noteGain);
        noteGain.connect(destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.5);
      }
    });
  };

  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create main volume control
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(isMuted ? 0 : 0.25, ctx.currentTime);
    mainGain.connect(ctx.destination);
    gainNodeRef.current = mainGain;

    // Create simple Feedback Delay for dreamlike spacey reverb
    const delayNode = ctx.createDelay(1.0);
    const delayFeedback = ctx.createGain();
    const delayFilter = ctx.createBiquadFilter();

    delayNode.delayTime.setValueAtTime(0.6, ctx.currentTime); // 600ms delay
    delayFeedback.gain.setValueAtTime(0.4, ctx.currentTime);  // 40% feedback
    delayFilter.type = "lowpass";
    delayFilter.frequency.setValueAtTime(1000, ctx.currentTime); // Warm feedback

    // Connect delay circuit
    delayNode.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(delayNode);
    delayFeedback.connect(mainGain); // delay goes to main output

    // Filter to warm up original notes
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.connect(mainGain);
    filter.connect(delayNode); // feed into delay

    // Start generator loop
    const playLoop = () => {
      if (ctx.state === "suspended") return;
      playAmbientNote(ctx, filter);
      
      // Schedule next notes randomly between 3.5 to 5.5 seconds
      const nextTime = 3500 + Math.random() * 2000;
      timerRef.current = setTimeout(playLoop, nextTime);
    };

    // Keep active
    playLoop();
  };

  // Start playing when startPlaying changes or user interacts
  useEffect(() => {
    if (startPlaying && isMuted) {
      // Auto-unmute when started
      setIsMuted(false);
      setIsPlaying(true);
    }
  }, [startPlaying]);

  // Handle mute/unmute state changes
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : 0.25;
      gainNodeRef.current.gain.linearRampToValueAtTime(targetGain, audioCtxRef.current.currentTime + 1.2);
    }
  }, [isMuted]);

  // Master controller
  const toggleMute = async () => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx) {
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      
      if (isMuted) {
        setIsMuted(false);
        setIsPlaying(true);
      } else {
        setIsMuted(true);
      }
    } else {
      setIsMuted(false);
      setIsPlaying(true);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Handle initialization on window click to unlock AudioContext if needed
  useEffect(() => {
    const handleFirstClick = () => {
      if (startPlaying && !audioCtxRef.current) {
        initAudio();
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
      }
    };
    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [startPlaying]);

  return (
    <div id="ambient-audio-control" className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMute}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-500 shadow-lg ${
          isMuted
            ? "bg-slate-900/40 text-slate-400 border border-slate-800/60 hover:bg-slate-800/60"
            : "bg-gradient-to-r from-pink-500/10 to-blue-500/10 text-[#FFD7E8] border border-[#FFD7E8]/25 hover:border-[#FFD7E8]/50 shadow-[0_0_15px_rgba(255,215,232,0.15)]"
        }`}
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        <span className="relative flex h-2 w-2 mr-0.5">
          {!isMuted && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD7E8] opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isMuted ? "bg-slate-500" : "bg-[#FFD7E8]"}`}></span>
        </span>
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span className="text-xs font-mono tracking-wider uppercase font-medium">
          {isMuted ? "Music Off" : "Ambient Piano"}
        </span>
        <Music className={`w-3.5 h-3.5 opacity-60 ${!isMuted ? "animate-pulse" : ""}`} />
      </button>
    </div>
  );
}
