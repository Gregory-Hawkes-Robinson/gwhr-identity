import { GhNotificationType } from "./GhNotificationType";

export interface IGhNotification {
    name: string;
    description: string;
    details: string;
    type: GhNotificationType;
}