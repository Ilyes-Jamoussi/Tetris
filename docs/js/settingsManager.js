/**
 * TETRIS GAME - SETTINGS MANAGER
 * Gestion des paramètres utilisateur
 */

export class SettingsManager {
    constructor(audioManager) {
        this.audioManager = audioManager;
        this.settings = {
            soundEnabled: true,
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
        this.soundToggle = document.getElementById('soundToggle');
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
        
        this.soundToggle.addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.audioManager.enabled = e.target.checked;
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
        this.soundToggle.checked = this.settings.soundEnabled;
        this.volumeSlider.value = this.settings.volume * 100;
        this.volumeValue.textContent = `${Math.round(this.settings.volume * 100)}%`;
        this.ghostToggle.checked = this.settings.ghostEnabled;
        
        this.audioManager.enabled = this.settings.soundEnabled;
        this.audioManager.setVolume(this.settings.volume);
    }

    isGhostEnabled() {
        return this.settings.ghostEnabled;
    }
}
