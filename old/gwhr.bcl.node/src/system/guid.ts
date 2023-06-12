const crypto = require('crypto');

export class Guid {
    public static newGuid(): string {
        return crypto.randomUUID();
    }
}