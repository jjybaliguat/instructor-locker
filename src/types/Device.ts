export interface Device {
    id: string,
    name: string,
    gpsTopic: string,
    emergencyTopic: string,
    battLevelTopic: string,
    gpsData: any
}