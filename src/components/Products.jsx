import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const FilterSection = ({
  selectedCategories,
  handleCategoryChange,
  handlePriceChange,
  handleRatingChange,
  clearFilters,
}) => {
  const categories = ["beauty", "fragrances", "furniture", "groceries"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarGroupContent className="px-4 py-2">
        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="capitalize text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Price Range Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Price Range
          </h3>
          <input
            type="range"
            min="0"
            max="2500"
            step="10"
            defaultValue="2500"
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>$0</span>
            <span>$2500</span>
          </div>
        </div>
        {/* Rating Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </h3>
          <div className="flex flex-wrap gap-2">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none text-sm"
                aria-label={`Filter by ${rating} stars`}
              >
                <span>{rating}</span>
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </button>
            ))}
          </div>
        </div>
        {/* Clear Filters Button */}
        <Button onClick={clearFilters} className="w-full text-sm">
          Clear All Filters
        </Button>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handlePriceChange = (price) => {
    setMaxPrice(price);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(2500);
    setMinRating(0);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      product.price <= maxPrice &&
      product.rating >= minRating
  );

  const categories = [
    { id: "all", label: "All Products", category: null },
    { id: "beauty", label: "Beauty", category: "beauty" },
    { id: "fragrances", label: "Fragrances", category: "fragrances" },
    { id: "furniture", label: "Furniture", category: "furniture" },
    { id: "groceries", label: "Groceries", category: "groceries" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full py-16">
        <Sidebar className="bg-gray-50 cursor-pointer">
          <SidebarHeader>
            <div className="flex items-center p-4"></div>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <SidebarGroup>
                <SidebarGroupContent></SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />

              <FilterSection
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                handlePriceChange={handlePriceChange}
                handleRatingChange={handleRatingChange}
                clearFilters={clearFilters}
              />
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <header className="flex items-center p-4 border-b">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-semibold">Product Catalog</h1>
          </header>
          <div className="container mx-auto px-4 py-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">
                  No products found matching your filters.
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-auto object-cover rounded-t-lg"
                      />
                      <CardTitle className="text-2xl font-semibold mt-2">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {product.description.length > 100
                          ? `${product.description.slice(0, 100)}...`
                          : product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <strong className="text-lg">
                          ${product.price.toFixed(2)}
                        </strong>
                        <div className="flex items-center">
                          <Star
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                          />
                          <span className="ml-1 text-gray-600">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger>
                          <Button className="w-full cursor-pointer">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{product.title}</DialogTitle>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-auto object-cover rounded-t-lg"
                            />
                            <DialogDescription>
                              {product.description}
                            </DialogDescription>
                            <strong className="text-lg">
                              ${product.price.toFixed(2)}
                            </strong>
                          </DialogHeader>
                          <Link to={"/buyproduct"}>
                            <Button className="w-full cursor-pointer">
                              Add to Cart
                            </Button>
                          </Link>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Products;
