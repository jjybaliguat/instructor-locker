import { InstructorProfile } from "./instructors";

export interface Locker {
    id: string,
    lockerNumber: number,
    status: LockerStatus,
    assignedTo: InstructorProfile,
}

enum LockerStatus {
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED"
}