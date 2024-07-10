    import { Avatar, Button, Dropdown, Navbar, NavbarLink, TextInput } from "flowbite-react";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import {AiOutlineSearch} from 'react-icons/ai'
    import {FaMoon, FaSun} from 'react-icons/fa'
    import { useSelector  } from "react-redux";
    import { useDispatch } from "react-redux";
    import { toggleTheme } from "../redux/theme/themeSlice";
    import { signoutSuccess } from "../redux/user/userSlice";
    import { useState, useEffect } from "react";


    export default function Header() {
        const path = useLocation().pathname;
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {currentUser} = useSelector(state => state.user)
        const{theme} = useSelector((state) => state.theme);
        const [searchTerm, setSearchTerm] = useState('');

        useEffect(() => {
            const urlParams = new URLSearchParams(location.search);
            const searchTermFromUrl = urlParams.get('searchTerm');
            if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
            }
        }, [location.search]);

        const handleSignout = async () => {
            try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/signout`, {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
            } catch (error) {
            console.log(error.message);
            }
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const urlParams = new URLSearchParams(location.search);
            console.log(location.search);
            urlParams.set('searchTerm', searchTerm);
            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);
        };
    return (
        <Navbar className="border-b-2">
            <Link to="/" className='self center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Muse </span>
                Matrix
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch}
                className="hidden lg:inline" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <button className="w-10 h-10 lg:hidden" color="gray" pill = "true">
                <AiOutlineSearch/>
            </button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12  h-10 hidden sm:inline" color="gray" pill="true" onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ?   <FaMoon/> :  <FaSun/> 
                
                    
                    }
                </Button>
                {currentUser ? (
                    <Dropdown 
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="user" img={currentUser.profilePicture}
                        rounded />
                    }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">@UserName: {currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">@Email {currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item><strong>Profile</strong></Dropdown.Item>

                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ):
                (
                    <Link to='/signin'>
                    <button class="relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" outline>Sign In </button>
                    </Link>

                )}
                <Navbar.Toggle />
                
            </div>
            <Navbar.Collapse>
                    <Navbar.Link active={path ==='/'} as={'div'}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                
                    <Navbar.Link active={path ==='/about'} as={'div'}>
                        <Link to='/about'>
                            About
                        </Link>
                    </Navbar.Link>

                    
                    <Navbar.Link active={path ==='/dashboard?tab=profile'} as={'div'}>
                        <Link to='/dashboard?tab=profile'>
                            Profile
                        </Link>
                    </Navbar.Link>

                    <Navbar.Link active={path ==='/dashboard?tab=dash'} as={'div'}>
                        <Link to='/dashboard?tab=dash'>
                            Dashboard
                        </Link>
                    </Navbar.Link>
                    
                </Navbar.Collapse>
    
        </Navbar>
    )
    }
