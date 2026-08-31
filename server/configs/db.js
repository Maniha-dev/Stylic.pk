import mongoose from "mongoose";

const databaseName = 'stylic';
let connectionPromise;

const getMongoUri = () => {
    const configuredUri = process.env.MONGODB_URI?.trim();

    if (!configuredUri) {
        throw new Error('MONGODB_URI is not configured');
    }

    const queryIndex = configuredUri.indexOf('?');
    if (queryIndex === -1) {
        return `${configuredUri.replace(/\/$/, '')}/${databaseName}`;
    }

    const baseUri = configuredUri.slice(0, queryIndex).replace(/\/$/, '');
    const query = configuredUri.slice(queryIndex);
    return `${baseUri}/${databaseName}${query}`;
};

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(getMongoUri(), {
            serverSelectionTimeoutMS: 10000,
        })
            .then(() => {
                console.log(`MongoDB connected (readyState: ${mongoose.connection.readyState})`);
                return mongoose.connection;
            })
            .catch((error) => {
                connectionPromise = undefined;
                console.error(`MongoDB connection failed (readyState: ${mongoose.connection.readyState}): ${error.message}`);
                throw error;
            });
    }

    return connectionPromise;
}

export default connectDB;