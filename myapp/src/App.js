import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdvancedSearch from "./pages/AdvancedSearch";
import SearchResults from "./pages/SearchResults";
import MatchmakingRecommendations from "./pages/MatchmakingRecommendations";
import EventCalendar from "./pages/EventCalendar";
import UserManagement from "./pages/UserManagement";
import PetRegistration from "./pages/PetRegistration";
import PetManagement from "./pages/PetManagement";
import Messages from "./pages/Messages";
import Conversations from "./pages/Conversations";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import Forum from "./pages/Forum";



import PetCompatibility from "./pages/PetCompatibility";
import PetProfile from "./pages/PetProfile";
import AddPet from "./pages/AddPet";  // ✅ Make sure this is imported
import PetDetails from "./pages/PetDetails";
import PetList from "./pages/PetList";
import PetMatches from "./pages/PetMatches"; // Import Pet Matching Page
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";  // Import the 404 page
import AdminUsers from "./pages/AdminUsers";
import AdminPets from "./pages/AdminPets";
import MatchHistory from "./pages/MatchHistory"; // Import MatchHistory pagecd 
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ProfileSettings from "./pages/ProfileSettings";
import Subscription from "./pages/Subscription";
import PetGallery from "./pages/PetGallery";
import FAQHelp from './pages/FAQHelp';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import BlogNews from './pages/BlogNews';
import  Dashboard  from "./pages/DashBoard";
import EditProfile from "./pages/EditProfile";
import ViewMatches from "./pages/ViewMatches";
import ForgotPassword from "./pages/ForgotPassword";
import SearchPets from "./pages/SearchPets";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />  {/* Welcome Page */}
        <Route path="/register" element={<Register />} />  {/* Register Page */}
        <Route path="/login" element={<Login />} />  {/* Login Page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-pets" element={<SearchPets />} />
        <Route path="/register-pet" element={<PetRegistration />} />
        <Route path="/pet-matches" element={<PetMatches />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/pet-gallery" element={<PetGallery />} />
        <Route path="/messages" element={<Messages />} /> {/* Uses Messages.js */}
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/register-pet" element={<PetRegistration />} />
        <Route path="/pet-management" element={<PetManagement />} />
        <Route path="/blog" element={<BlogNews />} />
        <Route path="/forum" element={<Forum />} />








        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/view-matches" element={<ViewMatches />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/matchmaking-recommendations" element={<MatchmakingRecommendations />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/pet-compatibility-details" element={<PetCompatibility />} />
        <Route path="/petprofile" element={<PetProfile />} />
        <Route path="/add-pet" element={<AddPet />} />  {/* ✅ Make sure this route is added */}
        <Route path="/pet-details" element={<PetDetails />} />
        <Route path="/petslist" element={<PetList />} />
        <Route path="/pet-matches" element={<PetMatches />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-pets" element={<AdminPets />} />
        <Route path="*" element={<NotFound />} />  {/* This handles unknown routes */}
        <Route path="/admin/match-history" element={<MatchHistory />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/faq" element={<FAQHelp />} />
      </Routes>
    </Router>
  );
}

export default App;
