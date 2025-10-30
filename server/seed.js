const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');

// Load environment variables
dotenv.config();

// Sample data
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Doe',
  },
];

const categories = [
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Latest in tech and programming',
    color: '#007bff',
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Tips for better living',
    color: '#28a745',
  },
  {
    name: 'Travel',
    slug: 'travel',
    description: 'Explore the world',
    color: '#dc3545',
  },
  {
    name: 'Food',
    slug: 'food',
    description: 'Recipes and culinary adventures',
    color: '#ffc107',
  },
];

const posts = [
  {
    title: 'Getting Started with MERN Stack',
    slug: 'getting-started-with-mern-stack',
    content: 'The MERN stack is a popular full-stack JavaScript framework that consists of MongoDB, Express.js, React.js, and Node.js. In this post, we\'ll explore how to get started with building applications using the MERN stack...',
    excerpt: 'Learn the basics of the MERN stack and how to build modern web applications.',
    tags: ['mern', 'javascript', 'web-development'],
    featuredImage: 'quantum-computing.jpg',
    isPublished: true,
  },
  {
    title: '10 Tips for Better Code Quality',
    slug: '10-tips-for-better-code-quality',
    content: 'Writing clean, maintainable code is essential for any developer. Here are 10 practical tips to improve your code quality...',
    excerpt: 'Improve your coding skills with these essential tips for writing better code.',
    tags: ['coding', 'best-practices', 'development'],
    featuredImage: 'blockchain.jpg',
    isPublished: true,
  },
  {
    title: 'Exploring React Hooks',
    slug: 'exploring-react-hooks',
    content: 'React Hooks are a powerful feature that allows you to use state and other React features in functional components. Let\'s dive deep into the most commonly used hooks...',
    excerpt: 'Master React Hooks to write more efficient and cleaner React components.',
    tags: ['react', 'hooks', 'frontend'],
    featuredImage: '5g-networks.jpg',
    isPublished: true,
  },
  {
    title: 'The Future of Web Development',
    slug: 'the-future-of-web-development',
    content: 'Web development is constantly evolving. From progressive web apps to serverless architecture, let\'s explore what the future holds...',
    excerpt: 'Discover emerging trends and technologies shaping the future of web development.',
    tags: ['web-development', 'future', 'trends'],
    featuredImage: 'quantum-computing.jpg',
    isPublished: true,
  },
  {
    title: 'Healthy Eating Habits',
    slug: 'healthy-eating-habits',
    content: 'Maintaining a healthy diet is crucial for overall well-being. Here are some practical tips for developing better eating habits...',
    excerpt: 'Learn how to build sustainable healthy eating habits for a better lifestyle.',
    tags: ['health', 'nutrition', 'lifestyle'],
    featuredImage: 'minimalism.jpg',
    isPublished: true,
  },
  {
    title: 'Remote Work Productivity Tips',
    slug: 'remote-work-productivity-tips',
    content: 'Working remotely can be challenging, but with the right strategies, you can stay productive and maintain work-life balance...',
    excerpt: 'Boost your productivity while working from home with these proven strategies.',
    tags: ['remote-work', 'productivity', 'work-life-balance'],
    featuredImage: 'healthy-habits.jpg',
    isPublished: true,
  },
  {
    title: 'Mastering Node.js for Backend Development',
    slug: 'mastering-node-js-backend',
    content: 'Node.js is a powerful runtime for building scalable backend services. Learn about asynchronous programming, modules, and best practices for server-side development...',
    excerpt: 'Learn how to leverage Node.js for robust server-side applications.',
    tags: ['nodejs', 'backend', 'javascript'],
    featuredImage: 'financial-independence.jpg',
    isPublished: true,
  },
  {
    title: 'Introduction to TypeScript',
    slug: 'introduction-to-typescript',
    content: 'TypeScript adds static typing to JavaScript, making it easier to build large-scale applications. Discover interfaces, generics, and type safety...',
    excerpt: 'Discover the benefits of using TypeScript in your projects.',
    tags: ['typescript', 'javascript', 'programming'],
    featuredImage: 'minimalism.jpg',
    isPublished: true,
  },
  {
    title: 'Building Responsive Web Designs',
    slug: 'building-responsive-web-designs',
    content: 'Responsive design ensures your website looks great on all devices. Learn about media queries, flexible grids, and mobile-first approaches...',
    excerpt: 'Tips and techniques for creating mobile-friendly websites.',
    tags: ['css', 'responsive-design', 'web-development'],
    featuredImage: 'blockchain.jpg',
    isPublished: true,
  },
  {
    title: 'The Art of Cooking Pasta',
    slug: 'art-of-cooking-pasta',
    content: 'Pasta is a versatile dish that can be prepared in countless ways. Explore different sauces, cooking techniques, and regional variations...',
    excerpt: 'Explore delicious pasta recipes and cooking techniques.',
    tags: ['pasta', 'cooking', 'recipes'],
    featuredImage: 'fermentation.jpg',
    isPublished: true,
  },
  {
    title: 'Top Travel Destinations in Europe',
    slug: 'top-travel-destinations-europe',
    content: 'Europe offers a wealth of cultural and natural wonders. From Paris to Rome, discover must-visit spots and hidden gems...',
    excerpt: 'Discover the best places to visit in Europe.',
    tags: ['travel', 'europe', 'destinations'],
    featuredImage: 'southeast-asia.jpg',
    isPublished: true,
  },
  {
    title: 'Mindfulness and Meditation Practices',
    slug: 'mindfulness-meditation-practices',
    content: 'Mindfulness can help reduce stress and improve mental health. Learn simple meditation techniques for daily life and stress management...',
    excerpt: 'Learn simple meditation techniques for daily life.',
    tags: ['mindfulness', 'meditation', 'wellness'],
    featuredImage: 'sustainable-travel.jpg',
    isPublished: true,
  },
  {
    title: 'Sustainable Living Tips',
    slug: 'sustainable-living-tips',
    content: 'Adopting sustainable practices can make a positive impact on the environment. From reducing waste to eco-friendly habits, start small...',
    excerpt: 'Practical advice for living a more eco-friendly lifestyle.',
    tags: ['sustainability', 'environment', 'lifestyle'],
    featuredImage: 'cultural-immersion.jpg',
    isPublished: true,
  },
  {
    title: 'Photography Basics for Beginners',
    slug: 'photography-basics-beginners',
    content: 'Photography is an art that anyone can learn with the right techniques. Understand composition, lighting, and camera settings...',
    excerpt: 'Get started with photography using simple tips and tricks.',
    tags: ['photography', 'beginners', 'art'],
    featuredImage: 'minimalism.jpg',
    isPublished: true,
  },
  {
    title: 'Understanding Cryptocurrency',
    slug: 'understanding-cryptocurrency',
    content: 'Cryptocurrency is revolutionizing finance and investment. Learn about blockchain, wallets, and trading basics...',
    excerpt: 'An introduction to the world of digital currencies.',
    tags: ['cryptocurrency', 'finance', 'blockchain'],
    featuredImage: 'healthy-habits.jpg',
    isPublished: true,
  },
  {
    title: 'Home Workout Routines',
    slug: 'home-workout-routines',
    content: 'Staying fit doesn\'t require a gym; try these home workout ideas. Bodyweight exercises, yoga, and cardio routines for all levels...',
    excerpt: 'Effective exercises you can do at home without equipment.',
    tags: ['fitness', 'workout', 'health'],
    featuredImage: 'financial-independence.jpg',
    isPublished: true,
  },
  {
    title: 'Exploring Asian Cuisine',
    slug: 'exploring-asian-cuisine',
    content: 'Asian cuisine is diverse and flavorful, from sushi to curry. Discover regional dishes, ingredients, and cooking methods...',
    excerpt: 'A journey through the tastes of Asia.',
    tags: ['asian-food', 'cuisine', 'recipes'],
    featuredImage: 'plant-based-cooking.jpg',
    isPublished: true,
  },
  {
    title: 'Digital Marketing Strategies',
    slug: 'digital-marketing-strategies',
    content: 'Effective digital marketing can boost your online presence. Learn about SEO, social media, and content marketing tactics...',
    excerpt: 'Key strategies for successful online marketing.',
    tags: ['marketing', 'digital', 'business'],
    featuredImage: 'coffee-culture.jpg',
    isPublished: true,
  },
  {
    title: 'Gardening for Beginners',
    slug: 'gardening-for-beginners',
    content: 'Growing your own vegetables can be rewarding and fun. Start with basics like soil, seeds, and plant care...',
    excerpt: 'Start your gardening journey with these basic tips.',
    tags: ['gardening', 'plants', 'hobby'],
    featuredImage: 'fermentation.jpg',
    isPublished: true,
  },
  {
    title: 'The Rise of Artificial Intelligence',
    slug: 'rise-of-artificial-intelligence',
    content: 'AI is transforming industries and everyday life. Explore machine learning, neural networks, and future applications...',
    excerpt: 'Explore the impact and future of artificial intelligence.',
    tags: ['ai', 'technology', 'future'],
    featuredImage: '5g-networks.jpg',
    isPublished: true,
  },
  // Additional Technology Posts
  {
    title: 'Quantum Computing: The Next Frontier',
    slug: 'quantum-computing-next-frontier',
    content: 'Quantum computing promises to solve complex problems beyond classical computers. Learn about qubits, superposition, and potential applications in cryptography and drug discovery...',
    excerpt: 'Dive into the revolutionary world of quantum computing.',
    tags: ['quantum-computing', 'technology', 'innovation'],
    featuredImage: 'quantum-computing.jpg',
    isPublished: true,
  },
  {
    title: 'Blockchain Beyond Cryptocurrency',
    slug: 'blockchain-beyond-cryptocurrency',
    content: 'Blockchain technology extends far beyond digital currencies. Explore its applications in supply chain management, voting systems, and decentralized finance...',
    excerpt: 'Discover diverse applications of blockchain technology.',
    tags: ['blockchain', 'technology', 'decentralization'],
    featuredImage: 'blockchain.jpg',
    isPublished: true,
  },
  {
    title: 'The Evolution of 5G Networks',
    slug: 'evolution-of-5g-networks',
    content: '5G technology is revolutionizing connectivity with faster speeds and lower latency. Understand its impact on IoT, autonomous vehicles, and smart cities...',
    excerpt: 'Explore how 5G is shaping the future of connectivity.',
    tags: ['5g', 'technology', 'networks'],
    featuredImage: '5g-networks.jpg',
    isPublished: true,
  },
  // Additional Travel Posts
  {
    title: 'Hidden Gems in Southeast Asia',
    slug: 'hidden-gems-southeast-asia',
    content: 'Beyond the tourist hotspots, Southeast Asia offers incredible hidden destinations. From remote islands in Indonesia to ancient temples in Cambodia, discover lesser-known treasures...',
    excerpt: 'Uncover Southeast Asia\'s best-kept secrets.',
    tags: ['southeast-asia', 'travel', 'hidden-gems'],
    featuredImage: 'southeast-asia.jpg',
    isPublished: true,
  },
  {
    title: 'Sustainable Travel: Eco-Friendly Adventures',
    slug: 'sustainable-travel-eco-friendly-adventures',
    content: 'Travel responsibly with these sustainable practices. Learn about carbon-offset programs, eco-lodges, and ways to minimize your environmental impact while exploring...',
    excerpt: 'Travel the world while protecting the planet.',
    tags: ['sustainable-travel', 'eco-friendly', 'adventure'],
    featuredImage: 'sustainable-travel.jpg',
    isPublished: true,
  },
  {
    title: 'Cultural Immersion: Living Like a Local',
    slug: 'cultural-immersion-living-like-local',
    content: 'Experience authentic cultures by living like locals. From homestays in rural villages to participating in traditional ceremonies, discover meaningful ways to connect...',
    excerpt: 'Immerse yourself in local cultures for unforgettable experiences.',
    tags: ['cultural-immersion', 'travel', 'local-experiences'],
    featuredImage: 'cultural-immersion.jpg',
    isPublished: true,
  },
  // Additional Lifestyle Posts
  {
    title: 'Minimalism: Decluttering Your Life',
    slug: 'minimalism-decluttering-your-life',
    content: 'Embrace minimalism to simplify your life. Learn practical tips for decluttering your home, digital life, and mindset for a more focused and peaceful existence...',
    excerpt: 'Simplify your life through the power of minimalism.',
    tags: ['minimalism', 'lifestyle', 'decluttering'],
    featuredImage: 'minimalism.jpg',
    isPublished: true,
  },
  {
    title: 'Building Healthy Habits for Longevity',
    slug: 'building-healthy-habits-longevity',
    content: 'Small daily habits can significantly impact your health and lifespan. Explore evidence-based practices for better sleep, nutrition, exercise, and mental well-being...',
    excerpt: 'Cultivate habits that promote a longer, healthier life.',
    tags: ['healthy-habits', 'longevity', 'wellness'],
    featuredImage: 'healthy-habits.jpg',
    isPublished: true,
  },
  {
    title: 'Financial Independence: A Lifestyle Choice',
    slug: 'financial-independence-lifestyle-choice',
    content: 'Achieve financial freedom through smart planning and disciplined saving. Learn about passive income streams, investment strategies, and the psychology of wealth...',
    excerpt: 'Take control of your financial future.',
    tags: ['financial-independence', 'lifestyle', 'wealth'],
    featuredImage: 'financial-independence.jpg',
    isPublished: true,
  },
  // Additional Food Posts
  {
    title: 'Fermentation: Ancient Preservation Techniques',
    slug: 'fermentation-ancient-preservation-techniques',
    content: 'Discover the art of fermentation used for millennia to preserve and enhance foods. From kimchi to kombucha, learn about beneficial bacteria and health benefits...',
    excerpt: 'Explore the science and art of food fermentation.',
    tags: ['fermentation', 'food', 'preservation'],
    featuredImage: 'fermentation.jpg',
    isPublished: true,
  },
  {
    title: 'Plant-Based Cooking: Delicious and Nutritious',
    slug: 'plant-based-cooking-delicious-nutritious',
    content: 'Create flavorful plant-based meals that are both delicious and nutritious. Learn about protein sources, flavor combinations, and easy recipes for every meal...',
    excerpt: 'Master the art of plant-based cooking.',
    tags: ['plant-based', 'cooking', 'nutrition'],
    featuredImage: 'plant-based-cooking.jpg',
    isPublished: true,
  },
  {
    title: 'Coffee Culture Around the World',
    slug: 'coffee-culture-around-world',
    content: 'Coffee is more than a beverage—it\'s a cultural experience. Journey through global coffee traditions, from Italian espresso bars to Ethiopian coffee ceremonies...',
    excerpt: 'Explore coffee cultures from around the globe.',
    tags: ['coffee', 'culture', 'food'],
    featuredImage: 'coffee-culture.jpg',
    isPublished: true,
  },
];

// Seed function
const seedDB = async () => {
  try {
    // Connect to database
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-blog');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log('Users created:', createdUsers.length);

    // Create categories
    const createdCategories = await Category.create(categories);
    console.log('Categories created:', createdCategories.length);

    // Create posts with references - assign categories properly
    const postsWithRefs = posts.map((post, index) => {
      let categoryIndex;
      // Technology posts (indices 0-8, 20-22)
      if (index <= 8 || (index >= 20 && index <= 22)) {
        categoryIndex = 0; // Technology
      }
      // Travel posts (indices 10, 23-25)
      else if (index === 10 || (index >= 23 && index <= 25)) {
        categoryIndex = 2; // Travel
      }
      // Lifestyle posts (indices 4-6, 11-13, 15-16, 26-28)
      else if ([4,5,6,11,12,13,15,16,26,27,28].includes(index)) {
        categoryIndex = 1; // Lifestyle
      }
      // Food posts (indices 9, 17, 29-31)
      else if ([9,17,29,30,31].includes(index)) {
        categoryIndex = 3; // Food
      }
      // Default to Technology for remaining
      else {
        categoryIndex = 0;
      }

      return {
        ...post,
        author: createdUsers[index % createdUsers.length]._id,
        category: createdCategories[categoryIndex]._id,
      };
    });

    const createdPosts = await Post.create(postsWithRefs);
    console.log('Posts created:', createdPosts.length);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDB();
