/**
 * TETRIS GAME - AUDIO MANAGER
 * Gestion des sons et musique
 */

export class AudioManager {
    constructor() {
        this.sfxEnabled = true;
        this.musicEnabled = true;
        this.volume = 0.3;
        this.audioContext = null;
        this.backgroundMusic = null;
        this.musicGainNode = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.sfxEnabled = false;
        }
    }

    startBackgroundMusic() {
        if (!this.musicEnabled || !this.audioContext || this.backgroundMusic) return;
        
        try {
            // Tetris theme melody (simplified)
            const melody = [
                { freq: 659.25, duration: 0.4 },  // E
                { freq: 493.88, duration: 0.2 },  // B
                { freq: 523.25, duration: 0.2 },  // C
                { freq: 587.33, duration: 0.4 },  // D
                { freq: 523.25, duration: 0.2 },  // C
                { freq: 493.88, duration: 0.2 },  // B
                { freq: 440.00, duration: 0.4 },  // A
                { freq: 440.00, duration: 0.2 },  // A
                { freq: 523.25, duration: 0.2 },  // C
                { freq: 659.25, duration: 0.4 },  // E
                { freq: 587.33, duration: 0.2 },  // D
                { freq: 523.25, duration: 0.2 },  // C
                { freq: 493.88, duration: 0.6 },  // B
                { freq: 523.25, duration: 0.2 },  // C
                { freq: 587.33, duration: 0.4 },  // D
                { freq: 659.25, duration: 0.4 },  // E
                { freq: 523.25, duration: 0.4 },  // C
                { freq: 440.00, duration: 0.4 },  // A
                { freq: 440.00, duration: 0.4 }   // A
            ];
            
            this.musicGainNode = this.audioContext.createGain();
            this.musicGainNode.connect(this.audioContext.destination);
            this.musicGainNode.gain.value = this.volume * 0.3; // Music quieter than SFX
            
            this.playMelody(melody, 0);
        } catch (e) {
            console.warn('Background music failed:', e);
        }
    }

    playMelody(melody, index) {
        if (!this.musicEnabled || !this.audioContext) return;
        
        if (index >= melody.length) {
            // Loop the melody
            setTimeout(() => this.playMelody(melody, 0), 500);
            return;
        }
        
        const note = melody[index];
        const oscillator = this.audioContext.createOscillator();
        
        oscillator.connect(this.musicGainNode);
        oscillator.frequency.value = note.freq;
        oscillator.type = 'square';
        
        const now = this.audioContext.currentTime;
        oscillator.start(now);
        oscillator.stop(now + note.duration);
        
        setTimeout(() => this.playMelody(melody, index + 1), note.duration * 1000);
    }

    stopBackgroundMusic() {
        this.musicEnabled = false;
        if (this.musicGainNode) {
            this.musicGainNode.gain.value = 0;
        }
    }

    playTone(frequency, duration) {
        if (!this.sfxEnabled || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Audio playback failed:', e);
        }
    }

    play(soundName) {
        const sounds = {
            drop: () => this.playTone(150, 0.1),      // Piece lands
            line: () => this.playTone(400, 0.15),     // Line cleared
            gameOver: () => this.playTone(100, 0.3)   // Game over
        };
        
        if (sounds[soundName]) {
            sounds[soundName]();
        }
    }

    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        return this.sfxEnabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (this.musicEnabled) {
            this.startBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }
        return this.musicEnabled;
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.musicGainNode) {
            this.musicGainNode.gain.value = this.volume * 0.3;
        }
    }
}
