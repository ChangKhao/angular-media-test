import { BreakpointObserver } from '@angular/cdk/layout';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { EChartsOption } from 'echarts';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TableData {
  description: string;
  channel: string;
  item1: number;
  item2: number;
  item3: string;
}

const ELEMENT_DATA: TableData[] = [
  {channel: 'Channel 1', item1: 1, item2: 1.0079, item3: 'A', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {channel: 'Channel 2', item1: 2, item2: 4.0026, item3: 'B', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {channel: 'Channel 3', item1: 3, item2: 6.941, item3: 'C', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {channel: 'Channel 4', item1: 4, item2: 9.0122, item3: 'D', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {channel: 'Channel 5', item1: 5, item2: 10.811, item3: 'B', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {channel: 'Channel 6', item1: 6, item2: 12.0107, item3: 'C', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {channel: 'Channel 7', item1: 7, item2: 14.0067, item3: 'N', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  chartOptions: EChartsOption = {
    title: {
      text: 'Chart title',
      textStyle: {color: '#ffffff', fontSize: '14px'},
      padding: 15
    },
    xAxis: {
      name: 'Axis title',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { color: "#ffffff", align: 'center', verticalAlign: 'top' },
      type: 'category',
      data: ['Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name'],
      splitLine: { show: true, lineStyle: { color: 'gray' } }
    },
    yAxis: {
      name: 'Axis title',
      nameLocation: 'middle',
      nameGap: 45,
      position: 'left',
      nameTextStyle: { color: "#ffffff", align: 'center', verticalAlign: 'bottom' },
      type: 'value',
      max: 600,
      splitLine: { show: true, lineStyle: { color: 'gray' } }
    },
    legend: {
        type: 'plain',
        icon: 'rect',
        orient: 'horizontal',
        bottom: '0',
        padding: 0,
        itemWidth: 25,
        itemHeight: 2,
        textStyle: { color: '#fff' },
        selected: { 'Channel 1': true, 'Channel 2': true, 'Channel 3': true }
    },
    series: [{
      id: 0,
      name: 'Channel 1',
      type: 'bar',
      data: [300,300,300,300,300,300,300,300,300,300],
      itemStyle: {color: '#3DBE85'},
    },
    {
      id: 1,
      name: 'Channel 2',
      type: 'bar',
      data: [100,100,100,100,100,100,100,100,100,100],
      itemStyle: {color: '#BE3D3D'},
    },
    {
      id: 2,
      name: 'Channel 3',
      type: 'bar',
      data: [200,200,200,200,200,200,200,200,200,200],
      itemStyle: {color: '#C7C72F'},
    },
    ]
  }

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['channel', 'item1', 'item2', 'item3'];
  columnsToDisplay = ['channel', 'item1', 'item2', 'item3'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  expandedElement!: TableData | null;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private observer: BreakpointObserver, private _liveAnnouncer: LiveAnnouncer) { }
  
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.dataSource.sort = this.sort;
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) { 
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onCheckedItem(item: any, event: any) {  
    var updateChart = JSON.parse(JSON.stringify(this.chartOptions));
    console.log(updateChart);
    if(event.checked) {
      updateChart.legend.selected[item] = true;
      this.chartOptions = updateChart;
    } else {
      updateChart.legend.selected[item] = false;
      this.chartOptions = updateChart;
    }
  }

  viewType(type:any) {
    let chartBtn = document.getElementById('chartBtn');
    let tableBtn = document.getElementById('tableBtn');
    let chartView = document.getElementById('chartView');
    let tableView = document.getElementById('tableView');
    if(type == 'chart') {
      chartBtn?.classList.add('active');
      tableBtn?.classList.remove('active');
      chartView?.classList.add('active');
      tableView?.classList.remove('active');
    } else {
      chartBtn?.classList.remove('active');
      tableBtn?.classList.add('active');
      chartView?.classList.remove('active');
      tableView?.classList.add('active');
    }
  }

  ngOnInit(): void {}

}
