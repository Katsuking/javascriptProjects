import { connect } from '@/lib/db';
import Blog from '@/lib/modals/blog';
import Category from '@/lib/modals/category';
import User from '@/lib/modals/user';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, context: { params: any }) => {
  try {
    const blogId = context.params.blog;
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid blog id' }), {
        status: 400,
      });
    }
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const categoryId = searchParams.get('categoryId');
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or missing user id' }),
        { status: 400 },
      );
    }
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid category id' }),
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
    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: 'Category not found' }),
        {
          status: 404,
        },
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: 'Blog not found' }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ blog }), {
      status: 200,
    });
  } catch (e: any) {
    return new NextResponse('Error in getting blog' + e.message, {
      status: 500,
    });
  }
};

// localhost:3000/api/blogs/666693f1477d1dae2ed46e19?userId=66643fe3477d1dae2ed46df5
export const PATCH = async (req: Request, context: { params: any }) => {
  try {
    const blogId = context.params.blog;
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid blog id' }), {
        status: 400,
      });
    }

    const body = await req.json();
    const { title, description } = body;

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid or missing user id' }),
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }
    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return new NextResponse(JSON.stringify({ message: 'Blog not found' }), {
        status: 404,
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description },
      { new: true },
    );

    return new NextResponse(
      JSON.stringify({ message: 'Blog updated', blog: updatedBlog }),
      { status: 200 },
    );
  } catch (e: any) {
    return new NextResponse('Error in updating blog' + e.message, {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, context: { params: any }) => {
  try {
    const blogId = context.params.blog;
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid blog id' }), {
        status: 400,
      });
    }

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
      return new NextResponse(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }
    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return new NextResponse(JSON.stringify({ message: 'Blog not found' }), {
        status: 404,
      });
    }

    await Blog.findByIdAndDelete(blogId);
    return new NextResponse(JSON.stringify({ message: 'Blog is deleted' }), {
      status: 200,
    });
  } catch (e: any) {
    return new NextResponse('Error in deleting blog' + e.message, {
      status: 500,
    });
  }
};
