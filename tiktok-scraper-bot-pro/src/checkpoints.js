const fs = require('fs');
const path = require('path');

// CHECKPOINT MANAGER
class CheckpointManager {
    constructor(username, mode) {
        this.username = username;
        this.mode = mode; // 'engagement' or 'repost'
        this.checkpointDir = path.join(process.cwd(), 'checkpoints');
        this.checkpointFile = path.join(
            this.checkpointDir,
            `${username}_${mode}_checkpoint.json`
        );

        // Create checkpoint directory if not exists
        if (!fs.existsSync(this.checkpointDir)) {
            fs.mkdirSync(this.checkpointDir, { recursive: true });
        }
    }

    // Save checkpoint
    save(data) {
        try {
            fs.writeFileSync(
                this.checkpointFile,
                JSON.stringify(data, null, 2),
                'utf-8'
            );
            return true;
        } catch (error) {
            console.error('Error saving checkpoint:', error.message);
            return false;
        }
    }

    // Load checkpoint
    load() {
        try {
            if (fs.existsSync(this.checkpointFile)) {
                const data = fs.readFileSync(this.checkpointFile, 'utf-8');
                return JSON.parse(data);
            }
            return null;
        } catch (error) {
            console.error('Error loading checkpoint:', error.message);
            return null;
        }
    }

    // Check if checkpoint exists
    exists() {
        return fs.existsSync(this.checkpointFile);
    }

    // Delete checkpoint
    delete() {
        try {
            if (fs.existsSync(this.checkpointFile)) {
                fs.unlinkSync(this.checkpointFile);
            }
            return true;
        } catch (error) {
            console.error('Error deleting checkpoint:', error.message);
            return false;
        }
    }

    // Get checkpoint info
    getInfo() {
        const checkpoint = this.load();
        if (!checkpoint) return null;

        return {
            username: checkpoint.username,
            mode: checkpoint.mode,
            totalProcessed: checkpoint.processedVideos.length,
            lastBatch: checkpoint.currentBatch,
            timestamp: checkpoint.lastSaveTime
        };
    }
}

module.exports = { CheckpointManager };
