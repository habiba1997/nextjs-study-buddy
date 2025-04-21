# Study Buddy - Question Management Application

Study Buddy is a web application for managing study resources, questions, and notes. It allows users to create, view, edit, and organize study materials in a user-friendly interface.

## Features

- **Question Browser**: View all study questions and resources with advanced filtering
- **Detailed Question View**: See full questions, answers, and notes
- **Question Editing**: Edit existing questions with a user-friendly form interface
- **Notes Management**: Add, edit, and remove individual notes for each question
- **Tag System**: Organize questions with main tags and additional tags for better categorization
- **Question Types**: Categorize questions by different types (regular, dependency, etc.)
- **Modern UI**: Clean, responsive design with Bootstrap components
- **File-Based Storage**: Simple JSON-based data storage that's easy to manage

## Technologies Used

- **Next.js**: React framework for building the application
- **React Bootstrap**: UI component library
- **React Hooks**: For state management
- **Server API Routes**: For handling data updates
- **Docker**: For containerization and easy deployment

## Getting Started

### Prerequisites

- Node.js 14+ (if running locally)
- Docker and Docker Compose (for containerized deployment)

### Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Deployment

#### Production Deployment

1. Make sure Docker and Docker Compose are installed on your machine
2. Build and run the containers:
   ```bash
   docker-compose up -d
   ```
3. Access the application at [http://localhost:3000](http://localhost:3000)

#### Development Environment with Docker

For development with hot reloading and real-time updates:

1. Build and run the development containers:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```
2. Access the application at [http://localhost:3000](http://localhost:3000)
3. Any changes to the code will trigger automatic reloading

#### Building and Running with Docker Directly

1. Build the Docker image:
   ```bash
   docker build -t study-buddy .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 study-buddy
   ```

## Application Structure

- `/app`: Main application code, following Next.js App Router structure
- `/components`: Reusable React components
- `/models`: Type definitions and models
- `/public`: Static files including data.json for storage
- `/app/api`: API endpoints for data manipulation

## Data Management

The application uses a file-based storage system with data stored in `/public/data.json`. This file is updated whenever:

1. A new question is added through the navbar "Add Resource" button
2. An existing question is edited through the question detail page

## Docker Configuration

The application includes several Docker-related files:

- `Dockerfile`: Production-ready container configuration
- `Dockerfile.dev`: Development-focused container with hot reloading
- `docker-compose.yml`: Production orchestration configuration
- `docker-compose.dev.yml`: Development orchestration with volume mounts
- `.dockerignore`: Files to exclude from Docker context

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

npx create-next-app@latest ./
nvm install --lts
nvm list
nvm use 16
If you want to set a specific version as the default for new shells:

bash
Copy code
nvm alias default <version>

Clear the npm Cache (Optional): If you still encounter issues, try clearing the npm cache:

bash
Copy code
npm cache clean --force

rafce <- create a react compoennt quickly