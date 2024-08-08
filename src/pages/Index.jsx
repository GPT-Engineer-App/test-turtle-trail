import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paw, Heart, Info } from "lucide-react";

const CatBreed = ({ name, description, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paw className="mr-2 h-5 w-5 text-purple-500" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const CatFact = ({ fact }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-start mb-2"
  >
    <Info className="mr-2 h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
    <span>{fact}</span>
  </motion.li>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("breeds");
  const [searchTerm, setSearchTerm] = useState("");
  const [likedBreeds, setLikedBreeds] = useState([]);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive coloring and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "Large, gentle giants with long, fluffy coats.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Recognizable by their flat faces and long, luxurious fur.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Wild-looking cats with leopard-like spots or marbling.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and affectionate personality.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  const catFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a 'clowder'.",
    "Cats have over 20 vocalizations, including the famous meow.",
    "A cat's sense of smell is 14 times stronger than a human's.",
    "Cats can jump up to six times their length.",
    "The first cat in space was a French cat named Felicette in 1963.",
    "Cats can't taste sweetness.",
    "A cat's hearing is much more sensitive than a human's or dog's.",
  ];

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (breedName) => {
    setLikedBreeds(prev =>
      prev.includes(breedName)
        ? prev.filter(name => name !== breedName)
        : [...prev, breedName]
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const pawPrint = document.createElement('div');
      pawPrint.className = 'absolute text-purple-300 opacity-50';
      pawPrint.style.left = `${Math.random() * 100}vw`;
      pawPrint.style.top = `${Math.random() * 100}vh`;
      pawPrint.innerHTML = '🐾';
      document.body.appendChild(pawPrint);

      setTimeout(() => {
        pawPrint.remove();
      }, 5000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 text-center text-purple-800"
        >
          Feline Fascination
        </motion.h1>

        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="facts">Cat Facts</TabsTrigger>
          </TabsList>
          <TabsContent value="breeds">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">Popular Cat Breeds</h2>
              <Input
                type="text"
                placeholder="Search breeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <AnimatePresence>
                {filteredBreeds.map((breed, index) => (
                  <motion.div
                    key={breed.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CatBreed {...breed} />
                    <Button
                      onClick={() => toggleLike(breed.name)}
                      variant="outline"
                      className="mb-4"
                    >
                      <Heart
                        className={`mr-2 h-4 w-4 ${
                          likedBreeds.includes(breed.name) ? 'fill-current text-red-500' : ''
                        }`}
                      />
                      {likedBreeds.includes(breed.name) ? 'Liked' : 'Like'}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
          <TabsContent value="facts">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-purple-700">Fascinating Cat Facts</h2>
              <ul className="space-y-2 text-gray-700">
                {catFacts.map((fact, index) => (
                  <CatFact key={index} fact={fact} />
                ))}
              </ul>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-700 mb-6"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
          characteristics and personalities.
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
