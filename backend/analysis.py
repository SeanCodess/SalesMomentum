# backend/analysis.py
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def analyze_sales(file_path: str):
    """
    Analyze sales data from a CSV and return insights + path to chart.
    """
    sales_df = pd.read_csv(file_path, parse_dates=['Date'])
    sales_df.set_index('Date', inplace=True)
    sales_df.sort_index(inplace=True)

    # --- Metrics ---
    daily_avg = sales_df['Sales'].mean()
    weekly_avg = sales_df.resample('W')['Sales'].mean().mean()
    monthly_avg = sales_df.resample('M')['Sales'].mean().mean()
    yearly_avg = sales_df.resample('Y')['Sales'].mean().mean()

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