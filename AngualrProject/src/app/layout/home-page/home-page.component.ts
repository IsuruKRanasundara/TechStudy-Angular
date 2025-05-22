import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


export interface LectureNote {
  id: number;
  title: string;
  technology: string;
  category: string;
  description: string;
  type: string;
  dateAdded: Date;
  difficulty: string;

}
  
// Body Components of home page 
@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  
})
export class HomePageComponent { 
 
// Search and filter properties
searchQuery: string = '';
isFilterOpen: boolean = false;
sortBy: string = 'relevance'; // default sort option
sortOptions: string[] = ['relevance', 'date', 'title', 'difficulty'];


 
  technologies: string[] = [
    'Angular', 'React', 'Vue.js', 'Node.js', 'Python', 'Java', 
    'C++', 'JavaScript', 'TypeScript', 'Docker', 'Kubernetes', 'AWS'
  ];
  
  difficultyLevels: string[] = ['beginner', 'intermediate', 'advanced'];
  
  selectedFilters: {
    technology: string[];
    type: string[];
    difficulty: string[];
  } = {
    technology: [],
    type: [],
    difficulty: []
  };

  lectureNotes: LectureNote[] = [
    {
      id: 1,
      title: 'Introduction to Angular Components',
      technology: 'Angular',
      category: 'Frontend',
      description: 'Learn the fundamentals of Angular components, lifecycle hooks, and data binding.',
      type: 'lecture',
      dateAdded: new Date('2024-01-15'),
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      technology: 'React',
      category: 'Frontend',
      description: 'Advanced concepts in React Hooks including custom hooks and performance optimization.',
      type: 'demonstration',
      dateAdded: new Date('2024-02-20'),
      difficulty: 'advanced'
    },
    {
      id: 3,
      title: 'Node.js REST API Development',
      technology: 'Node.js',
      category: 'Backend',
      description: 'Build scalable REST APIs using Node.js, Express, and MongoDB.',
      type: 'lecture',
      dateAdded: new Date('2024-01-30'),
      difficulty: 'intermediate'
    },
    {
      id: 4,
      title: 'Docker Containerization Demo',
      technology: 'Docker',
      category: 'DevOps',
      description: 'Hands-on demonstration of containerizing applications with Docker.',
      type: 'demonstration',
      dateAdded: new Date('2024-02-10'),
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'Python Data Structures',
      technology: 'Python',
      category: 'Programming',
      description: 'Comprehensive guide to Python data structures and algorithms.',
      type: 'lecture',
      dateAdded: new Date('2024-01-25'),
      difficulty: 'beginner'
    },
    {
      id: 6,
      title: 'AWS Cloud Architecture',
      technology: 'AWS',
      category: 'Cloud',
      description: 'Design and implement scalable cloud architectures using AWS services.',
      type: 'demonstration',
      dateAdded: new Date('2024-02-15'),
      difficulty: 'advanced'
    }
  ];

  filteredResults: LectureNote[] = [...this.lectureNotes];

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onSearch(): void {
    this.filterResults();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterResults();
  }

  onFilterChange(filterType: keyof typeof this.selectedFilters, value: string, event: any): void {
    if (event.target.checked) {
      this.selectedFilters[filterType].push(value);
    } else {
      const index = this.selectedFilters[filterType].indexOf(value);
      if (index > -1) {
        this.selectedFilters[filterType].splice(index, 1);
      }
    }
  }

  clearFilters(): void {
    this.selectedFilters = {
      technology: [],
      type: [],
      difficulty: []
    };
    this.filterResults();
  }

  applyFilters(): void {
    this.filterResults();
    this.isFilterOpen = false;
  }

  onSortChange(): void {
    this.sortResults();
  }

  private filterResults(): void {
    let results = [...this.lectureNotes];

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.technology.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (this.selectedFilters.technology.length > 0) {
      results = results.filter(item =>
        this.selectedFilters.technology.includes(item.technology)
      );
    }

    if (this.selectedFilters.type.length > 0) {
      results = results.filter(item =>
        this.selectedFilters.type.includes(item.type)
      );
    }

    if (this.selectedFilters.difficulty.length > 0) {
      results = results.filter(item =>
        this.selectedFilters.difficulty.includes(item.difficulty)
      );
    }

    this.filteredResults = results;
    this.sortResults();
  }

  private sortResults(): void {
    switch (this.sortBy) {
      case 'date':
        this.filteredResults.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
      case 'title':
        this.filteredResults.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty':
        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        this.filteredResults.sort(
          (a, b) =>
            difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
            difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        );
        break;
      default:
        // Keep original order for relevance
        break;
    }
  }
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
