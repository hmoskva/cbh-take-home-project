# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

To achieve the task's objectives, few action items will need to be performed, nost notably on the the database layer and the API layer which is responsible for generating the PDFS. The following tickets are hence spawned from the parent ticket described above. 

NB: In the context of this analysis, storypoints are used as an estimate of the overall effort required to fully implement a task. A scale of 1-5 is adopted here, 1 being easy/minimal and 5 being hardest/challenging. 

In more detail;

Story Points
- 1 Minimal effort, 1-2 hrs estimate
- 2 ~2-4 hrs estimate
- 3 Half a full day's shift estimate (8hr shift assumed)
- 4 ~8hrs estimate
- 5 Challenging, can take more than a full day's shift to complete


**Ticket 1**

**There is no table to hold unique information about an agent in a specific Facility. Create a new table (and migrations) in the database called *FacilityAgent* . This table would act as an intermediary between **Facility** and **Agent**. It would store data relating to each unique Agent in a Facility. The custom agent ids, along with any other specific information, such as the date an agent joined a facility - will be saved in this table.**

**Implementation Detail**

- Create a new schema definition for *FacilityAgent* table
- Run migrations to persist schema in database (an assumption is made about a code first approach)
- Create a custom migration function to back fill custom agent ids per facility. Use a standardized format for the defaults (e.g `FACILITY_ID/AGENT_ID/CREATED_YEAR`)


**Acceptance Criteria**

- A table exists in the database which can store unique information about  facility agents. 
- Optionally, existing facility agent ids are back filled and persisted in the newly created table

**Time/Effort Estimate**

Story points - 1



**Ticket 2**

**We would like to enable facility admins to add or update custom facility id to an agent via the front end application**

**Implementation details**

- Create guarded REST API endpoints (POST and PATCH) which will allow persisting new agent ids and updating respectively by facility admins only
- Implement a simple form on front end application, integrating the REST APIs to accomplish the objective

**Acceptance Criteria**

- Facility admins with valid admin permissions are able to add custom ids to agents in their facilities
- Facility admins with valid admin permissions are able to update custom ids of agents in their facilities

**Time/Effort Estimate**

Story points - 3



**Ticket 3**

**During report generation, we would like facility admins to be able to choose the ID type that would display on the PDFs, with a default of the custom facility IDs, if present.**

**Implementation Details**

- Update `getShiftsByFacility` function, ensuring that the related `FacilityAgent` data is returned as part of the agent metadata which is used during the PDF generation phase.
- Update `generateReport` function, allowing the dynamic selection of displayed ID based on a request parameter sent from the front end application

**Acceptance Criteria**

- Facility admins are able to pick between Custom IDs and standard IDs during report generation
- Custom IDs are displayed in generated PDFs if they exist, and no selected was made during report generation
- Inernal IDs are displated in generated PDFs if no custom IDs exist for the agent, and no choice was made during report generation

**Time/Effort Estimate**

Story points - 2
