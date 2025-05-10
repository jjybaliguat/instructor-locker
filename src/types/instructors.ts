export interface Instructor {
    id: string,
    email: string,
    role: string,
    instructor: InstructorProfile
}

interface InstructorProfile {
    name: string,
    qrCode: string,
    locker: Locker
}

interface Locker {
    lockerNumber: number,
    status: string
}