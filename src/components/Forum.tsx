import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'Current User', // Replace with actual user data
      date: new Date().toLocaleString(),
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Foro de la Comunidad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Título"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Contenido"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        />
        <Button type="submit">Publicar</Button>
      </form>
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.author} - {post.date}</p>
            <p className="mt-2">{post.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forum;