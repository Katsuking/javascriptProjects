import { connect } from '@/lib/db';
import Category from '@/lib/modals/category';
import User from '@/lib/modals/user';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

// api route - dynamic route
// localhost:3000/api/categories/6664427c477d1dae2ed46dfc?userId=66643fe3477d1dae2ed46df5
export const PATCH = async (req: Request, context: { params: any }) => {
  try {
    // [category]/route.ts
    const categoryId = context.params.category; // context.params.ダイナミックroute名で取得できる
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid category id' }),
        { status: 400 },
      );
    }

    const body = await req.json();
    const { title } = body;
    // 下記2行はurl paramsを取得するときの定番処理
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // どのユーザーが更新しようとしているかも取得
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or missing user id' }),
        { status: 400 },
      );
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }
    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: 'Category not found' }),
        {
          status: 404,
        },
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true },
    );

    return new NextResponse(
      JSON.stringify({
        message: 'category is updated!',
        category: updatedCategory,
      }),
      { status: 200 },
    );
  } catch (e: any) {
    return new NextResponse('Error in updating categories' + e.message, {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, context: { params: any }) => {
  try {
    const categoryId = context.params.category; // context.params.ダイナミックroute名で取得できる
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid category id' }),
        { status: 400 },
      );
    }
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // どのユーザーが更新しようとしているかも取得
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or missing user id' }),
        { status: 400 },
      );
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return new NextResponse(
        JSON.stringify({
          message: 'Category not found or does not belong to the user',
        }),
        {
          status: 404,
        },
      );
    }

    await Category.findByIdAndDelete(categoryId);
    return new NextResponse(
      JSON.stringify({ message: 'category is deleted' }),
      { status: 200 },
    );
  } catch (e: any) {
    return new NextResponse('Error in deleting categories' + e.message, {
      status: 500,
    });
  }
};
