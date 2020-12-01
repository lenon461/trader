import * as mongoose from 'mongoose';
export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect('mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures'),
    },
];