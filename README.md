# K6-Load-Tests
# K6-LoadTests-Payments

K6 Load Testing Suite for Payment Endpoints 🚀

📖 Introduction
This suite provides a comprehensive set of K6 scripts specifically designed to stress-test various payment endpoints. It encompasses modules covering Depositcards, Deposit Banking, Deposit Paypal, Withdrawal History, and more. It aims to ensure that the service remains resilient under heavy load, providing stakeholders with key metrics on performance and potential bottlenecks.

🛠️ Prerequisites & Setup
Install K6:
https://k6.io/docs/getting-started/installation/

Clone this repository:
git clone [your-repo-link]
cd [your-repo-directory]

(Optional) Set up any environment-specific configurations or credentials.

🏃 Running the Tests
To execute a particular script:
k6 run [path-to-script]

For example:
k6 run ./core/actions/deposit/depositBanking/depositNew/index.js

📊 Interpreting the Output

Metrics: K6 provides key metrics post-run like request durations, iterations, active VUs, and more.

Failed Requests: Keep an eye on http_req_failed to check for any failed requests.

Performance Thresholds: Review whether the performance meets predefined thresholds set in the thresholds.js file.

For a deeper dive into K6's output, see K6 Results Output.

🔧 Configuration & Advanced Usage
Virtual Users (VUs): To adjust the number of virtual users:


k6 run --vus [number-of-vus] [path-to-script]
Test Duration: To set a specific test duration:

k6 run --duration [duration] [path-to-script]

🤝 Contributing & Collaboration
Fork & Clone: Fork this repository and clone it to your local machine.
Branching: Always create a new branch for your work.
Committing Changes: Commit any changes you've made.
Push & PR: Push your changes to your fork and create a pull request to this repository.
For major changes or feature requests, please open an issue first to discuss the proposed changes.

📌 Notes
Ensure you're running the tests in a controlled environment to get consistent results.
Always monitor the target system for any anomalies when executing load tests.
