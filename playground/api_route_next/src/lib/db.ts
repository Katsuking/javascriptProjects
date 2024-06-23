import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  console.log('mongoose connection:', connectionState);

  if (connectionState === 1) {
    console.log('Already connected');
    return;
  }

  if (connectionState === 2) {
    console.log('Connecting...');
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: 'mongodb',
      bufferCommands: true,
    });
    console.log('connected!');
  } catch (e: any) {
    console.log('Something went wrong: ', e);
    throw new Error('Something went wrong: ', e);
  }
};

export default connect;
