        const { useState, useEffect, useMemo, createContext, useContext } = React;

        // --- ICONS (SVG Replacements for Lucide) ---
        // Since we can't import lucide-react in a simple HTML file without build steps,
        // we use a helper to render SVGs.
        const Icon = ({ name, size = 20, className = "" }) => {
            const icons = {
                Search: <path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />,
                Menu: <path d="M3 12h18M3 6h18M3 18h18" />,
                X: <path d="M18 6L6 18M6 6l12 12" />,
                Sun: <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
                Moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
                Home: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
                BookOpen: <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />,
                Users: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M16 3.13a4 4 0 010 7.75M23 21v-2a4 4 0 00-3-3.87" />,
                Mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />,
                LayoutDashboard: <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
                List: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
                PenTool: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" />,
                LogOut: <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />,
                ChevronRight: <path d="M9 18l6-6-6-6" />,
                Calendar: <path d="M19 4h-1V3a1 1 0 00-2 0v1H8V3a1 1 0 00-2 0v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z" />,
                Clock: <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" />,
                Heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
                Share2: <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />,
                MessageSquare: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
                TrendingUp: <path d="M23 6l-9.5 9.5-5-5L1 18" />,
                Eye: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 5a7 7 0 100 14 7 7 0 000-14zM12 9a3 3 0 110 6 3 3 0 010-6z" />,
                Edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
                Trash2: <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />,
                ArrowUp: <path d="M12 19V5M5 12l7-7 7 7" />,
                Tag: <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" />,
                Plus: <path d="M12 5v14M5 12h14" />,
                ImageIcon: <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 13a4 4 0 100-8 4 4 0 000 8z" />
            };

            return (
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className={className}
                >
                    {icons[name] || <circle cx="12" cy="12" r="10" />}
                </svg>
            );
        };

        // --- MOCK DATA ---
        const MOCK_CATEGORIES = [
            { id: 'tech', name: 'Technology', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 ring-1 ring-blue-500/20' },
            { id: 'design', name: 'Design', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 ring-1 ring-purple-500/20' },
            { id: 'business', name: 'Business', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 ring-1 ring-emerald-500/20' },
            { id: 'lifestyle', name: 'Lifestyle', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200 ring-1 ring-orange-500/20' },
            { id: 'tutorial', name: 'Tutorial', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200 ring-1 ring-pink-500/20' },
            { id: 'news', name: 'News', color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 ring-1 ring-slate-500/20' },
        ];

        const MOCK_AUTHORS = [
            { id: 1, name: 'Alex Rivera', role: 'Senior Editor', avatar: 'https://i.pravatar.cc/150?u=1', bio: 'Tech enthusiast and coffee addict. Writing about the future of web development.' },
            { id: 2, name: 'Sarah Chen', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?u=2', bio: 'Believer in clean code and cleaner interfaces. Specializing in accessibility.' },
            { id: 3, name: 'Marcus Johnson', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=3', bio: 'Helping startups scale. Writing about product strategy and growth.' },
        ];

        const INITIAL_POSTS = Array.from({ length: 12 }).map((_, i) => ({
            id: i + 1,
            title: [
                "The Future of React Server Components",
                "Mastering Tailwind CSS Grids",
                "Why UX Writing Matters",
                "Scaling Node.js Microservices",
                "The minimalist guide to Productivity",
                "Web3: Beyond the Hype",
                "Understanding Color Theory in UI",
                "A Guide to Modern SEO",
                "Building Accessible Forms",
                "State Management in 2024",
                "Deploying with Docker",
                "The Art of Code Review"
            ][i],
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            content: "This is a comprehensive guide exploring the topic in depth. \n\n## Introduction\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\n## Key Concepts\n- Point one\n- Point two\n- Point three\n\nConsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: `https://picsum.photos/seed/${i + 10}/800/400`,
            category: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].id,
            authorId: MOCK_AUTHORS[i % MOCK_AUTHORS.length].id,
            date: new Date(2023, 10, 15 - i).toISOString(),
            readTime: `${3 + (i % 5)} min read`,
            likes: 120 + (i * 15),
            views: 1000 + (i * 200),
            status: 'published'
        }));

        // --- CONTEXTS ---
        const ThemeContext = createContext();
        const AuthContext = createContext();
        const DataContext = createContext();
        const RouterContext = createContext();

        const useTheme = () => useContext(ThemeContext);
        const useAuth = () => useContext(AuthContext);
        const useData = () => useContext(DataContext);
        const useRouter = () => useContext(RouterContext);

        // --- COMPONENTS ---

        const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
            const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 hover:-translate-y-0.5";
            
            const variants = {
                primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-transparent",
                secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700",
                ghost: "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400",
                danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white shadow-lg shadow-red-500/30",
            };

            return (
                <button 
                    className={`${baseStyle} ${variants[variant]} ${className}`} 
                    onClick={onClick}
                    {...props}
                >
                    {children}
                </button>
            );
        };

        const Input = ({ label, error, className = "", ...props }) => (
            <div className={`flex flex-col gap-1 w-full ${className}`}>
                {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{label}</label>}
                <input 
                    className={`px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all duration-300
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'}`}
                    {...props} 
                />
                {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
            </div>
        );

        const Badge = ({ children, className = '' }) => (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${className}`}>
                {children}
            </span>
        );

        const ScrollToTop = () => {
            const [isVisible, setIsVisible] = useState(false);

            useEffect(() => {
                const toggleVisibility = () => {
                    setIsVisible(window.pageYOffset > 300);
                };
                window.addEventListener("scroll", toggleVisibility);
                return () => window.removeEventListener("scroll", toggleVisibility);
            }, []);

            return (
                <div className={`fixed bottom-8 right-8 transition-all duration-500 z-50 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="p-3 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 hover:bg-indigo-700 hover:scale-110 transition-all active:scale-95"
                    >
                        <Icon name="ArrowUp" size={24} />
                    </button>
                </div>
            );
        };

        const PostCard = ({ post, compact = false }) => {
            const { navigate } = useRouter();
            const category = MOCK_CATEGORIES.find(c => c.id === post.category) || MOCK_CATEGORIES[0];
            const author = MOCK_AUTHORS.find(a => a.id === post.authorId) || MOCK_AUTHORS[0];

            return (
                <div 
                    className={`group flex flex-col bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 cursor-pointer h-full transform hover:-translate-y-2 animate-fade-in`}
                    onClick={() => navigate('post', { id: post.id })}
                >
                    <div className={`relative overflow-hidden ${compact ? 'aspect-[2/1]' : 'aspect-[16/10]'}`}>
                        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                            <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 left-4">
                            <Badge className={`${category.color} shadow-lg backdrop-blur-md bg-opacity-95`}>
                                {category.name}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow relative">
                        <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 tracking-wide uppercase">
                            <div className="flex items-center gap-1"><Icon name="Calendar" size={12} /> {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <div className="flex items-center gap-1"><Icon name="Clock" size={12} /> {post.readTime}</div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {post.title}
                        </h3>
                        
                        {!compact && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                        
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-gray-800 group-hover:ring-indigo-500 transition-all" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">{author.name}</span>
                            </div>
                            <div className="flex gap-4 text-gray-400">
                                <div className="flex items-center gap-1.5 text-xs font-medium group-hover:text-pink-500 transition-colors">
                                    <Icon name="Heart" size={16} className={post.liked ? 'fill-pink-500 text-pink-500' : ''} /> {post.likes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const Navbar = () => {
            const { theme, toggleTheme } = useTheme();
            const { user } = useAuth();
            const { navigate, currentRoute } = useRouter();
            const [isMenuOpen, setIsMenuOpen] = useState(false);
            const [scrolled, setScrolled] = useState(false);

            useEffect(() => {
                const handleScroll = () => setScrolled(window.scrollY > 20);
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);

            const navLinks = [
                { label: 'Home', route: 'home', icon: 'Home' },
                { label: 'Blog', route: 'feed', icon: 'BookOpen' },
                { label: 'Authors', route: 'authors', icon: 'Users' },
            ];

            return (
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
                    ${scrolled 
                        ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50' 
                        : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 transform group-hover:rotate-12 transition-transform duration-300">L</div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:to-indigo-500 transition-all duration-300">Lumina</span>
                            </div>

                            <div className="hidden md:flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => navigate(link.route)}
                                        className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5
                                            ${currentRoute === link.route 
                                                ? 'text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 shadow-sm' 
                                                : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            <div className="hidden md:flex items-center gap-4">
                                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors transform hover:rotate-180 duration-500">
                                    <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
                                </button>
                                
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => navigate('dashboard')} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors">Dashboard</button>
                                        <div className="relative group cursor-pointer transform hover:scale-105 transition-transform">
                                            <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full border-2 border-indigo-500 p-0.5" />
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button onClick={() => navigate('login')} variant="primary" className="!py-1.5 !px-5 text-sm rounded-full">Sign In</Button>
                                )}
                            </div>

                            <button className="md:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
                            <div className="px-4 pt-2 pb-6 space-y-4">
                                {navLinks.map((link) => (
                                    <button key={link.label} onClick={() => { navigate(link.route); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                                        {link.label}
                                    </button>
                                ))}
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                    <span className="text-gray-500 text-sm">Theme</span>
                                    <button onClick={toggleTheme} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} />
                                    </button>
                                </div>
                                {!user && <Button onClick={() => { navigate('login'); setIsMenuOpen(false); }} className="w-full mt-4">Sign In</Button>}
                                {user && <Button onClick={() => { navigate('dashboard'); setIsMenuOpen(false); }} className="w-full mt-4">Dashboard</Button>}
                            </div>
                        </div>
                    )}
                </nav>
            );
        };

        const Footer = () => (
            <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">L</div>
                                <span className="text-2xl font-bold dark:text-white">Lumina</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed text-lg">A modern publishing platform for developers, designers, and thinkers. Share your story with the world in style.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
                            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Browse Articles</li>
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Featured Authors</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Us</li>
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact Support</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">© 2026 Lumina Blog. Built with React & Tailwind.</p>
                        <div className="flex gap-6 text-gray-400">
                            <div className="cursor-pointer hover:text-indigo-500 transform hover:scale-110 transition-all"><Icon name="Share2" size={20} /></div>
                            <div className="cursor-pointer hover:text-indigo-500 transform hover:scale-110 transition-all"><Icon name="Mail" size={20} /></div>
                            <div className="cursor-pointer hover:text-indigo-500 transform hover:scale-110 transition-all"><Icon name="MessageSquare" size={20} /></div>
                        </div>
                    </div>
                </div>
            </footer>
        );

        // --- PAGES ---

        const HomePage = () => {
            const { posts } = useData();
            const { navigate } = useRouter();
            const featured = posts[0];
            const latest = posts.slice(4, 10);

            return (
                <div className="pb-20 overflow-x-hidden animate-fade-in">
                    <div className="fixed top-0 left-0 w-full h-[800px] -z-10 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-[100px]"></div>
                        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[100px]"></div>
                    </div>

                    <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-20 max-w-4xl mx-auto animate-slide-up">
                                <div className="inline-block">
                                    <Badge className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 mb-6 border border-indigo-100 dark:border-indigo-800 px-4 py-1.5">✨ The Modern Publishing Platform</Badge>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">Stories that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">ignite</span> your imagination</h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">Discover the latest thoughts on technology, design, and culture from our community of world-class writers.</p>
                                <div className="flex justify-center gap-4">
                                    <Button onClick={() => navigate('feed')} className="!px-8 !py-3 !text-lg rounded-full">Start Reading</Button>
                                    <Button variant="secondary" className="!px-8 !py-3 !text-lg rounded-full">Become an Author</Button>
                                </div>
                            </div>

                            <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-28 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-[2.5rem] p-6 md:p-12 border border-white dark:border-gray-800 shadow-2xl shadow-indigo-200/40 dark:shadow-none hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors animate-slide-up">
                                <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-auto lg:h-[450px] shadow-lg">
                                    <img src={featured.image} alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="lg:pr-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Badge className="bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 px-3 py-1">Featured Story</Badge>
                                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{featured.readTime}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1]">{featured.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 line-clamp-3 leading-relaxed">{featured.excerpt}</p>
                                    <Button onClick={() => navigate('post', { id: featured.id })} className="rounded-full !px-6">Read Article <Icon name="ChevronRight" size={18} /></Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                        <div className="flex justify-between items-end mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Topics</h2>
                            <button onClick={() => navigate('feed')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">View all <Icon name="ChevronRight" size={16} /></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {MOCK_CATEGORIES.map((cat, idx) => (
                                <div key={cat.id} 
                                    onClick={() => navigate('feed', { category: cat.id })}
                                    className={`p-6 rounded-2xl ${cat.color} cursor-pointer shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-3 h-32 border border-transparent hover:border-black/5 transform hover:-translate-y-1`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center"><Icon name="Tag" size={18} className="opacity-70" /></div>
                                    <span className="font-bold">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg"><Icon name="TrendingUp" size={24} /></div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {latest.map((post, idx) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                </div>
            );
        };

        const FeedPage = ({ initialCategory }) => {
            const { posts } = useData();
            const [filter, setFilter] = useState(initialCategory || 'all');
            const [search, setSearch] = useState('');

            const filteredPosts = useMemo(() => {
                return posts.filter(post => {
                    const matchesCat = filter === 'all' || post.category === filter;
                    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
                    return matchesCat && matchesSearch;
                });
            }, [posts, filter, search]);

            return (
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen animate-fade-in">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">Explore Knowledge</h1>
                        <div className="relative w-full mb-10 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors"><Icon name="Search" size={20} /></div>
                                <input type="text" placeholder="Search for topics, articles, or ideas..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-0 outline-none shadow-sm text-lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button onClick={() => setFilter('all')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm transform hover:scale-105 active:scale-95 ${filter === 'all' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>All Posts</button>
                            {MOCK_CATEGORIES.map(cat => (
                                <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm transform hover:scale-105 active:scale-95 ${filter === cat.id ? 'bg-indigo-600 text-white shadow-indigo-500/30 shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{cat.name}</button>
                            ))}
                        </div>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                            <div className="inline-block p-6 rounded-full bg-white dark:bg-gray-800 mb-6 shadow-sm"><Icon name="Search" size={40} className="text-gray-300" /></div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                            <Button variant="ghost" onClick={() => {setSearch(''); setFilter('all');}} className="mt-4">Clear Filters</Button>
                        </div>
                    )}
                </div>
            );
        };

        const SinglePostPage = ({ id }) => {
            const { posts } = useData();
            const { navigate } = useRouter();
            const post = posts.find(p => p.id === id);
            const author = MOCK_AUTHORS.find(a => a.id === post?.authorId);
            const category = MOCK_CATEGORIES.find(c => c.id === post?.category);

            if (!post) return <div className="pt-32 text-center text-white">Post not found</div>;

            return (
                <article className="pt-32 pb-20 animate-fade-in">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-slide-up">
                        <Badge className={`${category.color} mb-8 inline-block px-4 py-1.5 text-sm shadow-sm`}>{category.name}</Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 leading-[1.15]">{post.title}</h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400 font-medium">
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 pr-4 pl-1.5 py-1.5 rounded-full">
                                <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                                <span className="text-gray-900 dark:text-white">{author.name}</span>
                            </div>
                            <div className="flex items-center gap-2"><Icon name="Calendar" size={18} /> <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                            <div className="flex items-center gap-2"><Icon name="Clock" size={18} /> <span>{post.readTime}</span></div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                        <div className="aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-200/50 dark:shadow-none">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg md:prose-xl prose-indigo dark:prose-invert max-w-none">
                            <p className="lead text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light">{post.excerpt}</p>
                            <div className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
                                {post.content.split('\n').map((para, i) => {
                                    if (para.startsWith('##')) return <h2 key={i} className="text-3xl font-bold mt-12 mb-6 tracking-tight text-gray-900 dark:text-white">{para.replace('##', '')}</h2>;
                                    if (para.startsWith('-')) return <li key={i} className="ml-4 pl-2 border-l-4 border-indigo-200 dark:border-indigo-900 mb-2">{para.replace('-', '')}</li>;
                                    return <p key={i} className="mb-6">{para}</p>;
                                })}
                            </div>
                        </div>

                        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-10 my-16 flex items-center justify-between">
                            <div className="flex gap-4">
                                <Button variant="ghost" className="bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-900/40 rounded-full px-6"><Icon name="Heart" size={20} className="mr-2" /> {post.likes} Likes</Button>
                                <Button variant="ghost" className="rounded-full px-6"><Icon name="Share2" size={20} className="mr-2" /> Share</Button>
                            </div>
                            <div className="flex gap-2">
                                {['Tech', 'Design'].map(tag => <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-medium">#{tag}</span>)}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50 p-10 rounded-3xl flex items-center gap-8 mb-20 border border-indigo-100 dark:border-gray-700">
                            <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Written by {author.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{author.bio}</p>
                                <Button variant="secondary" onClick={() => navigate('authors')} className="text-sm rounded-full h-8 px-4">View Profile</Button>
                            </div>
                        </div>
                    </div>
                </article>
            );
        };

        const Dashboard = () => {
            const { posts, deletePost } = useData();
            const { user, logout } = useAuth();
            const { navigate } = useRouter();
            const [view, setView] = useState('overview'); 
            
            if (!user) {
                // simple redirect effect
                useEffect(() => { navigate('login'); }, []);
                return null;
            }

            const renderContent = () => {
                switch(view) {
                    case 'overview':
                        return (
                            <div className="space-y-8 animate-fade-in">
                                <h2 className="text-2xl font-bold dark:text-white">Dashboard Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Total Views', val: '45.2K', icon: 'Eye', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                                        { label: 'Total Posts', val: posts.length, icon: 'List', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                                        { label: 'Subscribers', val: '1,204', icon: 'Users', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-5">
                                            <div className={`p-4 rounded-xl ${stat.bg}`}><Icon name={stat.icon} size={24} className={stat.color} /></div>
                                            <div>
                                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium block">{stat.label}</span>
                                                <span className="text-3xl font-bold dark:text-white">{stat.val}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    case 'posts':
                        return (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold dark:text-white">Manage Posts</h2>
                                    <Button onClick={() => setView('create')} className="rounded-full"><Icon name="Plus" size={18} /> New Post</Button>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                                            <tr>
                                                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {posts.map(post => (
                                                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="p-5 font-medium dark:text-gray-200 max-w-xs truncate">
                                                        <div className="flex items-center gap-3"><img src={post.image} className="w-10 h-10 rounded-lg object-cover" alt="" /> {post.title}</div>
                                                    </td>
                                                    <td className="p-5"><Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Published</Badge></td>
                                                    <td className="p-5 text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</td>
                                                    <td className="p-5 text-right space-x-2">
                                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Icon name="Edit" size={18} /></button>
                                                        <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Icon name="Trash2" size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    case 'create':
                        return (
                            <div className="max-w-4xl animate-slide-up">
                                <div className="flex items-center gap-4 mb-8">
                                    <Button variant="ghost" onClick={() => setView('posts')} className="!px-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"><Icon name="ChevronRight" className="rotate-180" size={20} /></Button>
                                    <h2 className="text-2xl font-bold dark:text-white">Create New Post</h2>
                                </div>
                                <form className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <Input label="Post Title" placeholder="Enter an engaging title..." className="!text-lg !py-3" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <Input label="Category" placeholder="Select category" />
                                        <Input label="Read Time" placeholder="e.g. 5 min read" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Cover Image</label>
                                        <div className="h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center text-gray-500 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"><Icon name="ImageIcon" size={24} /></div>
                                                <span className="text-sm font-medium">Click to upload image</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">Content</label>
                                        <textarea className="w-full h-80 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed" placeholder="Start writing your story..."></textarea>
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <Button variant="ghost" onClick={() => setView('posts')}>Cancel</Button>
                                        <Button className="rounded-full px-8">Publish Post</Button>
                                    </div>
                                </form>
                            </div>
                        );
                    default: return null;
                }
            }

            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex pt-16 animate-fade-in">
                    <aside className="w-72 fixed left-0 bottom-0 top-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col z-20">
                        <div className="p-6 flex-1">
                            <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700" alt="User" />
                                <div>
                                    <p className="font-bold text-sm dark:text-white">{user.name}</p>
                                    <p className="text-xs text-indigo-500 font-medium bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full inline-block mt-1">Administrator</p>
                                </div>
                            </div>
                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
                                    { id: 'posts', label: 'All Posts', icon: 'List' },
                                    { id: 'create', label: 'New Post', icon: 'PenTool' },
                                ].map(item => (
                                    <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${view === item.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <Icon name={item.icon} size={20} /> {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                <Icon name="LogOut" size={20} /> Sign Out
                            </button>
                        </div>
                    </aside>
                    <main className="flex-1 md:ml-72 p-8 lg:p-12 overflow-x-hidden">{renderContent()}</main>
                </div>
            );
        };

        const AuthPage = ({ type }) => {
            const { login } = useAuth();
            const { navigate } = useRouter();
            const [email, setEmail] = useState('');
            const [loading, setLoading] = useState(false);

            const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => {
                    login({ name: 'Demo User', email, avatar: 'https://i.pravatar.cc/150?u=99' });
                    setLoading(false);
                    navigate('dashboard');
                }, 1000);
            };

            return (
                <div className="min-h-screen pt-16 flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950 animate-fade-in">
                    <div className="w-full max-w-md bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl shadow-indigo-200/50 dark:shadow-none border border-white dark:border-gray-800 animate-slide-up">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg shadow-indigo-500/30">L</div>
                            <h1 className="text-3xl font-bold dark:text-white mb-2">{type === 'login' ? 'Welcome Back' : 'Join Lumina'}</h1>
                            <p className="text-gray-500 text-sm">Enter your credentials to access your dashboard</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="!py-3" />
                            <Input label="Password" type="password" placeholder="••••••••" required className="!py-3" />
                            <Button className="w-full py-3.5 mt-4 text-lg rounded-xl shadow-xl shadow-indigo-500/20" disabled={loading}>{loading ? 'Processing...' : (type === 'login' ? 'Sign In' : 'Create Account')}</Button>
                        </form>
                        <div className="mt-8 text-center text-sm">
                            <span className="text-gray-500">{type === 'login' ? "Don't have an account? " : "Already have an account? "}</span>
                            <button onClick={() => navigate(type === 'login' ? 'register' : 'login')} className="text-indigo-600 font-bold hover:underline">{type === 'login' ? 'Sign up' : 'Log in'}</button>
                        </div>
                    </div>
                </div>
            );
        };

        const AppContent = () => {
            const { currentRoute, routeParams } = useRouter();
            const { theme } = useTheme();

            return (
                <div className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 selection:bg-indigo-500/30`}>
                    <Navbar />
                    <ScrollToTop />
                    {currentRoute === 'home' && <HomePage />}
                    {currentRoute === 'feed' && <FeedPage initialCategory={routeParams?.category} />}
                    {currentRoute === 'post' && <SinglePostPage id={routeParams?.id} />}
                    {currentRoute === 'authors' && (
                        <div className="pt-40 pb-20 text-center max-w-6xl mx-auto px-4 animate-fade-in">
                            <div className="animate-slide-up">
                                <h1 className="text-5xl font-bold mb-6">Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Authors</span></h1>
                                <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16">The brilliant minds behind the stories. Writers, developers, and designers sharing their expertise.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {MOCK_AUTHORS.map((a, i) => (
                                    <div key={a.id} className="bg-white dark:bg-gray-900 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-20"></div>
                                            <img src={a.avatar} className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 relative z-10" />
                                        </div>
                                        <h3 className="font-bold text-2xl mb-1">{a.name}</h3>
                                        <p className="text-indigo-600 text-sm font-bold uppercase tracking-wide mb-4">{a.role}</p>
                                        <p className="text-gray-500 text-sm leading-relaxed">{a.bio}</p>
                                        <Button variant="secondary" className="mt-6 rounded-full text-sm">Follow Author</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {currentRoute === 'dashboard' && <Dashboard />}
                    {currentRoute === 'login' && <AuthPage type="login" />}
                    {currentRoute === 'register' && <AuthPage type="register" />}
                    {currentRoute !== 'dashboard' && <Footer />}
                </div>
            );
        };

        const App = () => {
            const [theme, setTheme] = useState('light');
            useEffect(() => {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
            }, []);
            useEffect(() => {
                document.documentElement.classList.toggle('dark', theme === 'dark');
            }, [theme]);

            const [user, setUser] = useState(null);
            const login = (userData) => setUser(userData);
            const logout = () => { setUser(null); navigate('home'); };

            const [posts, setPosts] = useState(INITIAL_POSTS);
            const deletePost = (id) => setPosts(prev => prev.filter(p => p.id !== id));

            const [currentRoute, setCurrentRoute] = useState('home');
            const [routeParams, setRouteParams] = useState({});
            const navigate = (route, params = {}) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setRouteParams(params);
                setCurrentRoute(route);
            };

            return (
                <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
                    <AuthContext.Provider value={{ user, login, logout }}>
                        <DataContext.Provider value={{ posts, deletePost }}>
                            <RouterContext.Provider value={{ currentRoute, routeParams, navigate }}>
                                <AppContent />
                            </RouterContext.Provider>
                        </DataContext.Provider>
                    </AuthContext.Provider>
                </ThemeContext.Provider>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    
