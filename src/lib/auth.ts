import bcrypt from 'bcryptjs';
import { connectToDB } from './mongodb';

const SALT_ROUNDS = 10;

export async function createUser(name: string, email: string, password: string) {
  const db = await connectToDB();
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  await db.collection('users').insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function verifyUser(email: string, password: string) {
  const db = await connectToDB();
  const user = await db.collection('users').findOne({ email });
  
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? { id: user._id.toString(), name: user.name, email: user.email } : null;
}