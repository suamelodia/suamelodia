import { NextResponse } from 'next/server'
import { createUser, getUserByEmail, updateUser, deleteUser } from '@/lib/usuario'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await createUser(body)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const body = await request.json()
    const user = await updateUser(parseInt(id), body)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const success = await deleteUser(parseInt(id))
    if (success) {
      return NextResponse.json({ message: 'User deleted successfully' })
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}

