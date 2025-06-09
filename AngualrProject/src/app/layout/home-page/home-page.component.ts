import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { generateResponse } from '../../../../FireBase/BackEnd/AiLogic';

interface LectureNote {
  id: number;
  title: string;
  technology: string;
  category: string;
  description: string;
  type: string;
  dateAdded: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class HomePageComponent {
  searchQuery = '';
  isFilterOpen = false;
  sortBy: 'relevance' | 'date' | 'title' | 'difficulty' = 'relevance';
  sortOptions = ['relevance', 'date', 'title', 'difficulty'];

  technologies = [
    'Angular', 'React', 'Vue.js', 'Node.js', 'Python', 'Java',
    'C++', 'JavaScript', 'TypeScript', 'Docker', 'Kubernetes', 'AWS'
  ];
  difficultyLevels = ['beginner', 'intermediate', 'advanced'];
  typeOptions = ['lecture', 'demonstration'];

  selectedFilters = {
    technology: [] as string[],
    type: [] as string[],
    difficulty: [] as string[]
  };
  aiQuery = ''; // For AI search query
  showAiSection = false; // For AI section toggle if needed

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

  get filteredResults(): LectureNote[] {
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

    // Sort
    switch (this.sortBy) {
      case 'date':
        results.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty':
        const order = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        results.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
        break;
      default:
        // relevance: keep original order
        break;
    }

    return results;
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  async onSearch() {
    try {
      this.showAiSection = true; // Show AI section when search is triggered
      console.log("Search triggered with query:", this.searchQuery);
      let searchQuery = this.searchQuery
      console.log("Search query:", searchQuery);
      if (searchQuery.trim() === '') {
        throw new Error('Search query cannot be empty');
      }
      this.aiQuery = await generateResponse(searchQuery);
      console.log("AI generated response:", this.aiQuery);
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  }

  clearSearch() {
    this.searchQuery = '';
  }
  async aiSearch() {
    if (this.searchQuery.trim() === '') {
      this.aiQuery = 'Please enter a search query for the AI assistant.';
      return;
    }
    this.aiQuery = 'Generating response...'; // <-- Prompting text
    try {
      const text = await generateResponse(this.searchQuery);
      this.aiQuery = text;
    } catch (error) {
      this.aiQuery = 'Error fetching AI response.';
      console.error(error);
    }
  }

  // Handles checkbox change event from filter panel
  onFilterChange(filterType: 'technology' | 'type' | 'difficulty', value: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const arr = this.selectedFilters[filterType];
    if (checked) {
      if (!arr.includes(value)) arr.push(value);
    } else {
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
    }
  }

  clearFilters() {
    this.selectedFilters = {
      technology: [],
      type: [],
      difficulty: []
    };
  }

  applyFilters() {
    this.isFilterOpen = false;
  }

  onSortChange() {
    // Sorting is handled reactively via getter
  }

  clearAiResponse() {
    this.aiQuery = '';
  }

  get wordCount(): number {
    return this.aiQuery
      ? this.aiQuery.trim().split(/\s+/).filter(w => w.length > 0).length
      : 0;
  }
}