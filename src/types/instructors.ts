export interface InstructorProfile {
    name: string,
    qrCode: string,
    locker: Locker,
    user: Instructor
}

interface Instructor {
    id: string,
    email: string,
    role: string,
    instructor: InstructorProfile
}


interface Locker {
    lockerNumber: number,
    status: string
}