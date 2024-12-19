// Example usage in a page or layout component
import SideNav1 from '@/Components/SideNav1/page';

export default function Layout({ children }) {
   return (
       <div className="flex">
           <SideNav1 />
           <main className="flex-grow">{children}</main>
       </div>
   );
}
