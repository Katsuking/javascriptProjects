import { connect } from '@/lib/db';
import User from '@/lib/modals/user';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

const objectId = require('mongoose').Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    // console.log('users', users);
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (e: any) {
    return new NextResponse('Error in fetching users: ' + e.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // console.log(body);
    await connect();
    const newUser = new User(body);
    await newUser.save(); // save it to db
    return new NextResponse(
      JSON.stringify({ message: 'new user is created!', user: newUser }),
      { status: 200 },
    );
  } catch (e: any) {
    return new NextResponse('Failed to create new user:' + e.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ message: 'ID or username is missing' }),
        { status: 400 },
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid userId' }), {
        status: 400,
      });
    }
    await connect();

    const updatedUser = await User.findOneAndUpdate(
      { _id: new objectId(userId) }, // userId がマッチするものを取得
      { username: newUsername },
      { new: true },
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: 'User is updated: ', user: updatedUser }),
      {
        status: 400,
      },
    );
  } catch (e: any) {
    return new NextResponse('Failed to create new user:' + e.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    // localhost:3000/api/users?userId=66633bf6477d1dae2ed46deb
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: 'ID is missing' }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid user id.' }), {
        status: 400,
      });
    }

    await connect();
    const deletedUser = await User.findOneAndDelete(new Types.ObjectId(userId));

    if (!deletedUser) {
      return new NextResponse(
        JSON.stringify({ message: 'User is not found in DB' }),
        { status: 400 },
      );
    }

    return new NextResponse(
      JSON.stringify({ message: 'User is deleted!:', user: deletedUser }),
      { status: 200 },
    );
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ message: 'Error in deleting user' + e.message }),
      { status: 500 },
    );
  }
};
