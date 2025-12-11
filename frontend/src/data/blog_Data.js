import Nextjs from "../assets/nextjs-logo.png"
import TypeScript from "../assets/typescript-logo.png"
import ReactLogo from "../assets/react-logo-abstract.png"
import API from "../assets/api-concept.png"

export const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    excerpt:
      "Next.js 15 introduces the next evolution of web development by combining the power of React Server Components, enhanced routing, and improved performance out of the box. This version focuses heavily on developer experience while giving you tools to build faster, more scalable, and more maintainable applications. Whether you're migrating from a previous version or starting fresh, Next.js 15 makes it easier than ever to structure your project, handle dynamic rendering, and optimize your pages automatically. With built-in image optimization, enhanced caching, and full support for the new App Router, developers can reduce bundle size, minimize re-renders, and deliver incredibly fast experiences for users. This article guides you step-by-step through the basics — from project setup to understanding server components and layouts. You'll learn how routing works, how to fetch data on the server without extra libraries, and how to deploy your application efficiently. By the end of this guide, you’ll have a solid foundation for building production-ready websites with the newest features that Next.js 15 brings to the modern web.",
    author: "John Doe",
    date: "2025-12-08",
    likes: 234,
    comments: 12,
    image: Nextjs,
  },

  {
    id: 2,
    title: "Mastering TypeScript Generics",
    excerpt:
      "TypeScript generics are one of the most powerful features of the language, enabling developers to write reusable, scalable, and type-safe code. Instead of repeating the same function or interface for different data types, generics help you create flexible building blocks that automatically adapt to whatever type you pass in. This guide takes a deeper look at how generics work, why they matter, and how they can dramatically improve the structure of your application. You’ll explore real-world scenarios such as reusable API wrappers, form handling logic, and dynamic components — all of which benefit greatly from generic constraints and inference. We also break down advanced concepts like generic classes, default types, and extending generic types to enforce stricter rules. Whether you're new to TypeScript or looking to push your skills further, mastering generics will help you write cleaner, safer, and more maintainable code. By the end of this article, you’ll understand how to use generics effectively and how they can transform the way you architect large-scale TypeScript projects.",
    author: "Jane Smith",
    date: "2025-12-07",
    likes: 189,
    comments: 8,
    image: TypeScript,
  },

  {
    id: 3,
    title: "React Performance Optimization",
    excerpt:
      "React is incredibly powerful, but without proper optimization, even the best applications can slow down and create poor user experiences. This guide explores practical, real-world techniques for keeping your React apps fast, smooth, and efficient. We focus on understanding unnecessary re-renders, optimizing component structure, and managing state in a way that reduces overhead. You’ll learn how to use memoization techniques like React.memo, useMemo, and useCallback effectively — not just theoretically. We’ll also examine how virtualization libraries like react-window can drastically improve list rendering. Additionally, we’ll look at how Suspense, lazy loading, and code splitting can reduce bundle size and boost performance on both mobile and desktop devices. For developers working with large applications, we’ll cover advanced strategies like selective state management, server-driven UI, and leveraging React Server Components for faster rendering. By the end of this article, you will understand the common performance pitfalls and walk away with a toolkit of proven methods to ensure your React applications stay fast as they scale.",
    author: "Bob Wilson",
    date: "2025-12-06",
    likes: 456,
    comments: 25,
    image: ReactLogo,
  },

  {
    id: 4,
    title: "Building Scalable APIs",
    excerpt:
      "Building scalable APIs requires the right balance of architecture, performance, security, and developer experience. This guide walks you through essential best practices for designing APIs that can support millions of users without breaking down under heavy load. We start with choosing the right architecture — REST, GraphQL, or microservices — and discuss how each approach affects scaling and deployment. You’ll learn how to structure endpoints efficiently, reduce latency using caching layers, and implement proper rate limiting to protect your API from abuse. We also cover database optimization, connection pooling, and how to use message queues for handling background tasks and reducing server stress. Reliability and monitoring are critical, so we explore logging strategies, error tracking, and performance metrics that help you identify issues early. Whether you're building a backend for a small project or designing a large enterprise system, this article provides the foundational principles needed to create APIs that are easy to maintain, robust under traffic spikes, and ready for long-term growth.",
    author: "Alice Brown",
    date: "2025-12-05",
    likes: 312,
    comments: 18,
    image: API,
  },
];
