export default class Vacation {
    public constructor(
        public destination: string,
        public description: string,
        public imageUrl: string,
        public startDate: string,
        public endDate: string,
        public price: number,
        public id?: number,
        public isFollowing?: boolean,
        public followers?: number
    ) {}

}