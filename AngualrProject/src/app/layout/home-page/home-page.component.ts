import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { generateResponse } from '../../../../FireBase/BackEnd/AiLogic';
import { getAllLecNotes, getLectureNoteByTechnology, saveLectureNoteData } from '../../../../FireBase/BackEnd/dataBase';


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
  selectedFilters: { technology: string[] } = {
    technology: [],
  };
  aiQuery = ''; // For AI search query
  showAiSection = false; // For AI section toggle if needed
  // Removed undefined FirebaseService instance
  lectureNotesCollection: any[] = []; // Initialize as an empty array






  technologies: string[] = [
    'Angular',
    'React',
    'Vue',
    'Node.js',
    'Django',
    'Flask',
    'Ruby on Rails',
    'Spring Boot',
    'Express.js',
    'Laravel',
    'Devops',
    'Machine Learning',
    'Data Science',
    'Blockchain',
    'Cybersecurity',
    'Internet of Things (IoT)',
    'Mobile Development',
    'Game Development',
    'Artificial Intelligence (AI)',
    'Cloud Computing',
    'Web Development',
    'Software Engineering',
    'Database Management',
    'UI/UX Design',
    'Testing and Quality Assurance',
    'Agile Methodologies',
    'Project Management',
    'Big Data',
  ];

    

    // Sort
 
 

toggleFilter() {
  this.isFilterOpen = !this.isFilterOpen;
}
  //Search in Existing Notes
searchNotes(text:string) { 
    getLectureNoteByTechnology(this.searchQuery)
      .then(notes => {
        this.lectureNotesCollection = notes;
      })
      .catch(error => {
        console.error('Error fetching lecture notes:', error);
        this.lectureNotesCollection = [];
      });
    
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
      this.lectureNotesCollection = await getLectureNoteByTechnology(this.searchQuery);
      //interface to save lecture note data
      interface data {
        title: string;
        technology: string;
        content: string;
        createdAt: string;
      }
      const dataToBeSaved: data = {
        title: this.searchQuery,
        technology: this.searchQuery,
        content: this.aiQuery,
        createdAt: new Date().toISOString()
      };
      saveLectureNoteData(dataToBeSaved);
      console.log("AI response:", this.aiQuery);
      console.log('Lecture notes found:', this.lectureNotesCollection);
console.log();
    } catch (error) {
      this.aiQuery = 'Error fetching AI response.';
      console.error(error);
    }
  }
  

  // Handles checkbox change event from filter panel
  onFilterChange(technology: string) {
 
    for (let technologyInArray of this.technologies) {
      if (technologyInArray === technology) {
        getLectureNoteByTechnology(technology)
          .then(notes => {
            this.lectureNotesCollection = notes;
          })
          .catch(error => {
            console.error('Error fetching lecture notes:', error);
            this.lectureNotesCollection = [];
          });
      }
    }
  }

  clearFilters() {
    this.selectedFilters = {
      technology: [],
    
 
    };
  }

  applyFilters() {
    this.isFilterOpen = false;
  }

  clearAiResponse() {
    this.aiQuery = '';
  }

  get wordCount(): number {
    return this.aiQuery
      ? this.aiQuery.trim().split(/\s+/).filter(w => w.length > 0).length
      : 0;
  }
  async ngOnInit() {
    try {
      const notes = await getAllLecNotes();
      this.lectureNotesCollection = Array.isArray(notes) ? notes  : [];
    } catch (error) {
      console.log('Error fetching all lecture notes:', error);
      this.lectureNotesCollection = [];
    }
  }

}