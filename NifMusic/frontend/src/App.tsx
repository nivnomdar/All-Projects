import { useState } from "react";
import "./App.css";
import { CategoryPills } from "./components/Categories/CategoryPills";
import PageHeader from "./components/Layout/PageHeader/PageHeader";

import { categories, videos } from "./data/Home";
import { VideoGridItem } from "./components/VideoGridItem";
import { Sidebar } from "./components/Layout/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />

        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          {/* Left Bar */}
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-hidden px-8 pb-4">
            {/* categories */}
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onselect={setSelectedCategory}
              />
            </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
