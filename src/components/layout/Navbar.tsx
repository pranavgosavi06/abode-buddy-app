
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageSquare, Home, Search, BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentLinks = [
    { text: 'Dashboard', href: '/student/dashboard', icon: <Home className="h-4 w-4 mr-2" /> },
    { text: 'Search PGs', href: '/student/search', icon: <Search className="h-4 w-4 mr-2" /> },
    { text: 'My Bookings', href: '/student/bookings', icon: <BookOpen className="h-4 w-4 mr-2" /> },
  ];

  const ownerLinks = [
    { text: 'Dashboard', href: '/owner/dashboard', icon: <Home className="h-4 w-4 mr-2" /> },
    { text: 'My Listings', href: '/owner/listings', icon: <Search className="h-4 w-4 mr-2" /> },
    { text: 'Bookings', href: '/owner/bookings', icon: <BookOpen className="h-4 w-4 mr-2" /> },
  ];

  const navLinks = user?.role === 'owner' ? ownerLinks : studentLinks;

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-pgblue-500">
                <span>Abode</span>
                <span className="text-gray-800">Buddy</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAuthenticated && navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/messages')}
                  className="mr-4"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-sm">
                      Signed in as <span className="font-semibold ml-1">{user?.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => navigate(user?.role === 'owner' ? '/owner/profile' : '/student/profile')}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            {isAuthenticated && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/messages')}
                className="mr-2"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                ))}
                <Link
                  to={user?.role === 'owner' ? '/owner/profile' : '/student/profile'}
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Button className="w-full" variant="outline" onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}>
                  Log in
                </Button>
                <Button className="w-full" onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
