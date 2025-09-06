import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
# backend/SalesMomentum.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS so your React frontend can talk to the backend during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "SalesMomentum backend is running"}

# Example endpoint for metrics
@app.post("/api/metrics/daily")
def daily_metrics(sales: list[int]):
    avg = sum(sales) / len(sales) if sales else 0
    return {"average_daily_sales": avg}
def analyze_sales(file_path):
    """
    Analyzes daily sales data from a CSV file to provide insights.

    Args:
        file_path (str): The path to the CSV file containing sales data.
                         The file must have two columns: 'Date' and 'Sales'.
    """
    # --- 1. Load and Prepare Data ---
    try:
        # Read the CSV file into a pandas DataFrame
        # The parse_dates=['Date'] argument tells pandas to interpret the 'Date' column as dates
        sales_df = pd.read_csv(file_path, parse_dates=['Date'])
        
        # Set the 'Date' column as the index of the DataFrame, which is useful for time-series analysis
        sales_df.set_index('Date', inplace=True)
        
        # Sort the data by date to ensure chronological order for calculations and plotting
        sales_df.sort_index(inplace=True)

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        print("Please make sure the CSV file is in the same directory as the script or provide the correct path.")
        return
    except Exception as e:
        print(f"An error occurred while reading the file: {e}")
        return

    if 'Sales' not in sales_df.columns:
        print("Error: The CSV file must contain a 'Sales' column.")
        return

    print("--- Sales Data Analysis ---")

    # --- 2. Calculate Averages ---
    print("\n--- Average Sales ---")
    daily_avg = sales_df['Sales'].mean()
    weekly_avg = sales_df.resample('W')['Sales'].mean().mean() # Resample by week ('W') and calculate the mean
    monthly_avg = sales_df.resample('M')['Sales'].mean().mean() # Resample by month ('M') and calculate the mean
    yearly_avg = sales_df.resample('Y')['Sales'].mean().mean() # Resample by year ('Y') and calculate the mean

    print(f"Overall Daily Average: ${daily_avg:,.2f}")
    print(f"Overall Weekly Average: ${weekly_avg:,.2f}")
    print(f"Overall Monthly Average: ${monthly_avg:,.2f}")
    print(f"Overall Yearly Average: ${yearly_avg:,.2f}")

    # --- 3. Find Peak Sales Days and Months ---
    print("\n--- Peak Sales Performance ---")
    
    # Group data by year to find the best month for each year
    for year, year_df in sales_df.groupby(sales_df.index.year):
        # Calculate total sales for each month in the current year
        monthly_sales = year_df.resample('M')['Sales'].sum()
        if not monthly_sales.empty:
            best_month = monthly_sales.idxmax()
            print(f"Month with Most Sales in {year}: {best_month.strftime('%B')} (${monthly_sales.max():,.2f})")

        # Find the day with the most sales for the year
        best_day_of_year = year_df['Sales'].idxmax()
        print(f"Day with Most Sales in {year}: {best_day_of_year.strftime('%Y-%m-%d')} (${year_df['Sales'].max():,.2f})")

        # Group data by month to find the best day for each month
        print(f"\n- Best Sales Day for Each Month in {year} -")
        monthly_groups = year_df.groupby(year_df.index.month)
        for month_num, month_df in monthly_groups:
            if not month_df.empty:
                best_day_of_month = month_df['Sales'].idxmax()
                month_name = best_day_of_month.strftime('%B')
                print(f"  {month_name}: {best_day_of_month.strftime('%Y-%m-%d')} (${month_df['Sales'].max():,.2f})")


    # --- 4. Visualize Sales Trajectory ---
    print("\nGenerating sales trajectory graph...")
    
    # Use seaborn for a nicer plot style
    sns.set_style("whitegrid")
    plt.figure(figsize=(14, 7))

    # Plot daily sales as a line
    plt.plot(sales_df.index, sales_df['Sales'], label='Daily Sales', color='lightblue', alpha=0.7)

    # Plot monthly average as a rolling window to smooth out daily fluctuations
    monthly_rolling_avg = sales_df['Sales'].rolling(window=30).mean()
    plt.plot(monthly_rolling_avg.index, monthly_rolling_avg, label='30-Day Rolling Average', color='darkblue', linewidth=2)

    # Formatting the plot
    plt.title('Sales Trajectory', fontsize=16)
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Sales ($)', fontsize=12)
    plt.legend()
    plt.grid(True)
    plt.tight_layout() # Adjust plot to ensure everything fits without overlapping

    # Save the plot to a file
    output_filename = 'sales_trajectory.png'
    plt.savefig(output_filename)
    print(f"Graph saved as '{output_filename}'")
    
    # Display the plot
    plt.show()


if __name__ == '__main__':
    # The name of your sales data file.
    # Make sure this file is in the same folder as your Python script.
    csv_file = 'sales_data.csv'
    
    # Check if a sample file needs to be created
    if not os.path.exists(csv_file):
        print(f"'{csv_file}' not found. Creating a sample file for you.")
        sample_data = {
            'Date': pd.to_datetime([
                '2023-01-05', '2023-01-06', '2023-01-07', '2023-02-10', '2023-02-11', 
                '2023-03-15', '2023-03-16', '2023-04-20', '2024-01-08', '2024-01-09',
                '2024-02-15', '2024-02-16', '2024-03-20', '2024-03-21'
            ]),
            'Sales': [250, 270, 310, 450, 480, 500, 520, 550, 280, 300, 500, 530, 600, 620]
        }
        sample_df = pd.DataFrame(sample_data)
        sample_df.to_csv(csv_file, index=False)
        print("A sample 'sales_data.csv' has been created. You can edit this file with your actual sales data.")

    analyze_sales(csv_file)