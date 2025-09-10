# backend/analysis.py
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def analyze_sales(file_path: str):
    """
    Analyze sales data from a CSV and return insights + path to chart.
    """
    try:
        sales_df = pd.read_csv(file_path, parse_dates=['Date'])
        sales_df.set_index('Date', inplace=True)
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
    
    print("---Sales Data Analysis---")

    # --- Metrics ---
    # --- DAILY AVERAGES ---
    # All time
    daily_all_time = sales_df['Sales'].mean()

    # For a given year (example: 2023)
    daily_year = sales_df.loc['2023']['Sales'].mean()

    # For a given month (example: March 2023)
    daily_month = sales_df.loc['2023-03']['Sales'].mean()


    # --- WEEKLY AVERAGES ---
    # All time
    weekly_all_time = sales_df['Sales'].resample('W').mean().mean()

    # For a given year
    weekly_year = sales_df.loc['2023']['Sales'].resample('W').mean().mean()

    # For a given month
    weekly_month = sales_df.loc['2023-03']['Sales'].resample('W').mean().mean()


    # --- MONTHLY AVERAGES ---
    # All time
    monthly_all_time = sales_df['Sales'].resample('M').mean().mean()

    # For a given year
    monthly_year = sales_df.loc['2023']['Sales'].resample('M').mean().mean()

    for year, year_df in sales_df.groupby(sales_df.index.year):
        monthly_sales = year_df.resample('M')['Sales'].sum()
        if not monthly_sales.empty:
            best_month = monthly_sales.idxmax().strftime('%B')
            best_month_sales = monthly_sales.max()
            print(f"Year {year}: Best Month: {best_month} with Sales: ${best_month_sales:.2f}")
        
        best_day_of_year = year_df['Sales'].idxmax()
        print(f"Year {year}: Best Day: {best_day_of_year.date()} with Sales: ${year_df['Sales'].max():.2f}")

        best_day_of_week = year_df.groupby(year_df.index.day_name())['Sales'].mean().idxmax()
        print(f"Year {year}: Best Day of Week: {best_day_of_week}")
              
        monthly_groups = year_df.groupby(year_df.index.month)
        for month_num, month_df in monthly_groups:
            best_day_of_month = month_df['Sales'].idxmax()
            month_name = best_day_of_month.strftime('%B')
            print(f"Year {year}, Month {month_name}: Best Day: {best_day_of_month.date()} with Sales: ${month_df['Sales'].max():.2f}")    

    # --- Chart ---
    sns.set_style("whitegrid")
    plt.figure(figsize=(14, 7))
    plt.plot(sales_df.index, sales_df['Sales'], label="Daily Sales", color="lightblue", alpha=0.7)
    monthly_rolling_avg = sales_df['Sales'].rolling(window=30).mean()
    plt.plot(monthly_rolling_avg.index, monthly_rolling_avg, label="30-Day Rolling Avg", color="darkblue", linewidth=2)

    plt.title("Sales Trajectory")
    plt.xlabel("Date")
    plt.ylabel("Sales ($)")
    plt.legend()
    plt.tight_layout()

    output_filename = "sales_trajectory.png"
    plt.savefig(output_filename)
    plt.close()

    # --- Return raw results ---
    return {
        "daily_avg": round(daily_avg, 2),
        "weekly_avg": round(weekly_avg, 2),
        "monthly_avg": round(monthly_avg, 2),
        "yearly_avg": round(yearly_avg, 2),
        "plot_file": output_filename
    }