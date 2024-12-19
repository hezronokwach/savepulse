// Example usage in a page or layout component
import SideNav from '@/Components/SideNav/page';

export default function Layout({ children }) {
   return (
       <div className="flex">
           <SideNav />
           <main className="flex-grow">{children}</main>
       </div>
   );
}
