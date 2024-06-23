import { connect } from '@/lib/db';
import Category from '@/lib/modals/category';
import User from '@/lib/modals/user';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    // 下記2行はurl paramsを取得するときの定番処理
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or missing user id' }),
        { status: 400 },
      );
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'User not found in the database' }),
        {
          status: 400,
        },
      );
    }

    // userIdがマッチするカテゴリーを取得する
    const categories = await Category.find({
      user: new Types.ObjectId(userId), // クライアントから取得したuserId
    });
    return new NextResponse(JSON.stringify(categories));
  } catch (e: any) {
    return new NextResponse('Error in fetching categories' + e.message, {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    // 下記2行はurl paramsを取得するときの定番処理
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or missing user id' }),
        { status: 400 },
      );
    }
    const { title } = await req.json();

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'User not found in the database' }),
        {
          status: 400,
        },
      );
    }

    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userId), // passed from client side.
    });
    await newCategory.save();

    return new NextResponse(
      JSON.stringify({
        message: 'new category is created!',
        categor: newCategory,
      }),
      { status: 200 },
    );
  } catch (e: any) {
    return new NextResponse('Error in creating categories' + e.message, {
      status: 500,
    });
  }
};
