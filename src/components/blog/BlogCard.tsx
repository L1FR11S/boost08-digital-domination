import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/blogUtils";
import { Clock } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  publishedAt: string;
  readingTime: number;
  categories?: string[];
}

const BlogCard = ({
  title,
  excerpt,
  slug,
  featuredImage,
  publishedAt,
  readingTime,
  categories = []
}: BlogCardProps) => {
  return (
    <Link to={`/blogg/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        {featuredImage && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{formatDate(publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime} min
            </span>
          </div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        </CardHeader>
        {categories.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};

export default BlogCard;
