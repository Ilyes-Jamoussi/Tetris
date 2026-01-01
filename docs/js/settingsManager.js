/**
 * TETRIS GAME - SETTINGS MANAGER
 * Gestion des paramètres utilisateur
 */

export class SettingsManager {
    constructor(audioManager) {
        this.audioManager = audioManager;
        this.settings = {
            sfxEnabled: true,
            musicEnabled: true,
            volume: 0.3,
            ghostEnabled: true
        };
        
        this.loadSettings();
        this.initElements();
        this.attachEvents();
        this.applySettings();
    }

    initElements() {
        this.modal = document.getElementById('settingsModal');
        this.openBtn = document.getElementById('settingsBtn');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.sfxToggle = document.getElementById('sfxToggle');
        this.musicToggle = document.getElementById('musicToggle');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.ghostToggle = document.getElementById('ghostToggle');
    }

    attachEvents() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        this.sfxToggle.addEventListener('change', (e) => {
            this.settings.sfxEnabled = e.target.checked;
            this.audioManager.sfxEnabled = e.target.checked;
            this.saveSettings();
        });
        
        this.musicToggle.addEventListener('change', (e) => {
            this.settings.musicEnabled = e.target.checked;
            this.audioManager.toggleMusic();
            this.saveSettings();
        });
        
        this.volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.settings.volume = volume;
            this.volumeValue.textContent = `${e.target.value}%`;
            this.audioManager.setVolume(volume);
            this.saveSettings();
        });
        
        this.ghostToggle.addEventListener('change', (e) => {
            this.settings.ghostEnabled = e.target.checked;
            this.saveSettings();
        });
    }

    open() {
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.style.display = 'flex';
    }

    close() {
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.style.display = 'none';
    }

    loadSettings() {
        const saved = localStorage.getItem('tetris_settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    saveSettings() {
        localStorage.setItem('tetris_settings', JSON.stringify(this.settings));
    }

    applySettings() {
        this.sfxToggle.checked = this.settings.sfxEnabled;
        this.musicToggle.checked = this.settings.musicEnabled;
        this.volumeSlider.value = this.settings.volume * 100;
        this.volumeValue.textContent = `${Math.round(this.settings.volume * 100)}%`;
        this.ghostToggle.checked = this.settings.ghostEnabled;
        
        this.audioManager.sfxEnabled = this.settings.sfxEnabled;
        this.audioManager.musicEnabled = this.settings.musicEnabled;
        this.audioManager.setVolume(this.settings.volume);
    }

    isGhostEnabled() {
        return this.settings.ghostEnabled;
    }
}
