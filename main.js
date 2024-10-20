class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SplashScene' });
    }

    preload() {
        this.load.image('logo', './images/logo_sundrop.png');
        this.load.image('start_screen', './images/homescreen4.png');
    }

    create() {
        // First splash screen 
        this.cameras.main.setBackgroundColor('#000000'); 
        
        const logoWidth = this.cameras.main.width * 0.5;
        const logoHeight = this.cameras.main.height * 0.8; 

        let logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'logo')
        .setDisplaySize(400, 300);
        let title = this.add.text(this.cameras.main.centerX, logo.y + logo.displayHeight / 2 + 20, 'Sundrop Entertainment', {
            fontSize: '32px', color: '#FFFFFF' 
        }).setOrigin(0.5);

        // Show first splash for 1 second, then show the second splash screen
        this.time.delayedCall(2000, () => {
            this.showSecondSplashScreen();
        });
    }

    showSecondSplashScreen() {
        // Clear previous splash elements
        this.cameras.main.setBackgroundColor('#FFFFFF'); 
        this.children.removeAll();

        // Second splash screen content
        let startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Click to Start!', { 
            fontSize: '32px', color: '#000000' 
        }).setOrigin(0.5);

        // Wait for user input to start the game
        this.input.on('pointerdown', () => {
            this.scene.start('NameInputScene'); // Transition to the name input game scene
        });
    }
}


    class NameInputScene extends Phaser.Scene {
        constructor() {
            super({ key: 'NameInputScene' });
        }
    
        create() {
            // Create a text input field
            const inputElement = document.createElement('input');
            inputElement.style.position = 'absolute';
            inputElement.style.left = `${this.cameras.main.centerX}px`;
            inputElement.style.top = `${this.cameras.main.centerY}px`;
            inputElement.style.transform = 'translate(-50%, -50%)';
            inputElement.style.fontSize = '32px';
            inputElement.style.color = '#000000';
            inputElement.style.backgroundColor = '#ffffff';
            inputElement.style.border = '2px solid #000000';
            inputElement.style.borderRadius = '5px';
            inputElement.placeholder = 'Enter your name';
            document.body.appendChild(inputElement);
            inputElement.focus();
    
            // Add a confirmation button
            const confirmButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Confirm', { 
                fontSize: '32px', color: 'red' 
            }).setOrigin(0.5).setInteractive();
    
            confirmButton.on('pointerdown', () => {
                const name = inputElement.value;
                document.body.removeChild(inputElement); // Remove input element
    
                // Transition to the confirmation scene
                this.scene.start('ConfirmationScene', { name: name });
            });
        }
    }
    
    class ConfirmationScene extends Phaser.Scene {
        constructor() {
            super({ key: 'ConfirmationScene' });
        }
    
        create(data) {
            const name = data.name;
    
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, `Your name: ${name}`, { 
                fontSize: '32px', color: '#000000' 
            }).setOrigin(0.5);
    
            const confirmText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Is this correct? Click to Continue', { 
                fontSize: '32px', color: '#000000' 
            }).setOrigin(0.5);
    
            // Wait for user confirmation
            this.input.on('pointerdown', () => {
                // Proceed to the game scene
                this.scene.start('GameScene', { name: name });
            });
        }
    }
    
    class GameScene extends Phaser.Scene {
        constructor() {
            super({ key: 'GameScene' });
        }
    
        preload() {
            this.load.image('start_screen', './images/homescreen4.png'); // Ensure this is loaded
        }
        
        create(data) {
            // Add the background image
            this.add.image(0, 0, 'start_screen')
                .setOrigin(0)
                .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
            // Display the name received from the previous scene
            this.add.text(100, 100, `Welcome, ${data.name}!`, { fontSize: '32px', color: '#ffffff' });
    
            // Here you can add more game elements as needed
        }
    
        update() {
        }
    }
    
    const config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        scene: [SplashScene, NameInputScene, ConfirmationScene, GameScene], 
        parent: 'phaser-container',
    };
    
    const game = new Phaser.Game(config);