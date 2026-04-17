CDNM Documentation Portal
Overview

Plain React and CSS documentation portal converted from `portal.html`.

This implementation focuses on usability, clarity, and establishing a scalable foundation for future enhancements.

- `index.html` loads React from a CDN and starts the app.
- `styles/main.css` contains the portal styles from the original page.
- `scripts/portal-markup.js` contains the portal HTML rendered by React.
- `scripts/app.js` initializes navigation, role selection, theme switching, search, and checklist behavior.

The primary objectives of this project are:

Provide a clear entry point for users interacting with the Gen3 platform
Organize resources in a role-specific and intuitive manner
Reduce friction in accessing documentation and tools
Establish a maintainable and deployable front-end structure
Live Application

The application is deployed and accessible at:

https://harshithayentrapragada.github.io/cdnm/
Key Capabilities
Role-Based Navigation

The portal differentiates between the following user roles:

Researcher
Developer / Engineer

Each role is presented with relevant resources and actions to improve usability and reduce complexity.

Structured Resource Access

The portal provides organized access to key resources, including:

Data Dictionary
Query Examples
Analysis Notebooks
Platform usage guidance

Redundant or duplicate entries have been removed to maintain clarity.

User Experience Improvements

The following improvements were implemented:

Simplified navigation structure
Clean and consistent layout
Logical grouping of related actions
Improved readability and alignment
Reduction of duplicate UI elements
Feedback Mechanism

A lightweight feedback system is included to capture:

General usability feedback
Suggestions for improvement

Technical issue reporting is handled separately through a ticketing system.

Architecture

The application follows a simple static architecture:

Frontend: HTML, CSS, JavaScript
Hosting: GitHub Pages
CI/CD: GitHub Actions
Code Organization: Modular and maintainable static components
CI/CD Implementation

A branch-based CI/CD workflow has been implemented to ensure controlled deployment.

Development Environment (dev branch)
Used for implementing and testing changes
Triggers CI pipeline for validation
Does not deploy to production
Production Environment (main branch)
Contains stable and reviewed changes
Triggers deployment pipeline
Automatically updates the live site
Workflow
dev → validate → merge → main → deploy → live
Development Process
Step 1: Develop and test changes
git checkout dev
git add .
git commit -m "Update feature"
git push origin dev
Step 2: Promote changes to production
git checkout main
git merge dev
git push origin main
Design Considerations

The following principles guided the implementation:

Clear separation between development and production environments
Minimal and focused UI to reduce cognitive load
Elimination of duplicate resources
Consistent alignment and typography
Maintainability for future enhancements
Challenges and Approach
Navigation consistency
Ensured stable behavior across sections and reloads
Duplicate resource handling
Identified and removed redundant entries to improve clarity
State management on reload
Reset UI state to avoid unintended persistence
Deployment reliability
Implemented CI/CD with controlled production deployment
Future Enhancements

Potential improvements include:

Preview environments for development changes
Enhanced validation steps in CI pipeline
Improved search and filtering capabilities
Integration of analytics for user interaction tracking
Summary

This project demonstrates:

Structured UI design for documentation systems
Role-based user experience design
Implementation of a branch-based CI/CD pipeline
Controlled deployment using GitHub Pages
A scalable foundation for future development


