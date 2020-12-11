import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminService } from '../../../shared/admin.service';

@Component({
	selector: 'app-user-listing',
	templateUrl: './user-listing.component.html',
	styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
	checked = false;
	indeterminate = false;
	labelPosition: 'before' | 'after' = 'after';
	disabled = false;
	tableData
	backUpTableData
	showLoader
	reqData
	getData
	dataSource
	datamodel
	length
	timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	filterValue
	responseData = []
	displayedColumns: string[] = ['select', 'sr.no', 'first_name','email', 'mobile_number','zipcode','status','action']
	element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(public adminService: AdminService, private router: Router) {
		this.selection = new SelectionModel(true, []);
		this.dataSource = new MatTableDataSource(this.responseData);
		 }

		 ngOnInit(): void {
			this.reqData = {}
				this.reqData.offset = 0
				this.reqData.limit = 10
				this.dataSource = new MatTableDataSource(this.responseData);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.datamodel = {}
				this.getAllUserList(this.reqData.limit, this.reqData.offset)
		  }
		  ngAfterViewInit() {
			this.dataSource.paginator = this.paginator
		}

		getAllUserList(limit, offset){
			this.adminService.userListing(limit, offset).subscribe(data => {
			  console.log(data)
			  if(data){
				this.length = data.count
				// this.dataSource = data.data;
				this.dataSource = new MatTableDataSource(data.data);
				console.log("Datrda",this.dataSource);
				// console.log(this.dataSource[0],"fixxxrst name")
			  }
			}, err => {
				console.log(err);
				if(err.status >= 400){
				  console.log('Invalid Credential!!!');
				}else{
				  console.log('Internet Connection Error');
				}
			})
		  }

	// applyFilter(filterValue: string) {
	// 	// this.dataSource.filter = filterValue.trim().toLowerCase();
	// 	// this.filterValue = filterValue.trim().toLowerCase();
	// 	var obj = {
	// 		filter_value: filterValue
	// 	}
	// 	this.AdminService.filterUser(obj).subscribe(data => {
	// 	  console.log(data)
	// 	  if (data) {
	// 	      this.responseData = data.data
	// 	      this.dataSource = new MatTableDataSource(data.data);
	// 	    //   this.length = data.data.count
	// 	    //   this.dataSource.sort = this.sort;
	// 	    //   this.dataSource.paginator = this.paginator;
	// 	    //   this.tableData = data.data;
	// 	    //   this.backUpTableData = data.data;
	// 	  	}
	// 	}, err => {
	// 	  console.log(err)
	// 	  if (err.status >= 400) {
	// 	    // this.toastr.error('Internal Error', 'Error')
	// 	    console.log('Invalid Credential!!!')
	// 	  } else {
	// 	    // this.toastr.error('Internet Connection Error', 'Error')
	// 	    console.log('Internet Connection Error')
	// 	  }

	// 	})
	// }


	getPageSizeOptions() {
		return [5,10, 20, 30];
	}

	paginationOptionChange(evt) {
		console.log(evt)
		this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
		this.reqData.limit = evt.pageSize
		console.log(this.reqData)
		this.adminService.getExamList(this.reqData.limit, this.reqData.offset).subscribe(data => {
			console.log(data)
			if (data) {
				this.responseData = data.data.data.rows
				this.length = data.data.count
				this.dataSource = new MatTableDataSource(data.data.data);
				this.dataSource.sort = this.sort;
				console.log(this.dataSource)
				if (this.filterValue) {
					this.dataSource.filter = this.filterValue
				}
			}
		}, err => {
			console.log(err)
			if (err.status >= 400) {
				// this.toastr.error('Internal Error', 'Error')
			} else {
				// this.toastr.error('Internet Connection Error', 'Error')
				console.log('Internet Connection Error')
			}
		})
  }

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		// console.log(this.selection)
		return numSelected === numRows;

	}
	masterToggle() {
		console.log(this.selection)
		this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	}

	// approveUser(element) {
	// 	var data = {
	// 		id: element.id,
	// 		approval: element.admin_approval == 'yes' ? 'no' : 'yes'
	// 	}
	// 	this.AdminService.approveUser(data).subscribe(data => {
	// 		console.log(data)
	// 		if (data) {
	// 			// this.toastr.success("Sucessfully deleted", 'Success')
	// 			this.getUserListing(this.reqData.limit, this.reqData.offset)
	// 		}
	// 	}, err => {
	// 		console.log(err)
	// 		if (err.status >= 400) {
	// 			// this.toastr.error('Internal Error', 'Error')
	// 			console.log('Invalid Credential!!!')
	// 		} else {
	// 			// this.toastr.error('Internet Connection Error', 'Error')
	// 			console.log('Internet Connection Error')
	// 		}

	// 	})

	// }

	// deleteUser(id) {
	// 	console.log("===",id)
	// 	let obj = {
	// 		id: id
	// 	}
	// 	this.AdminService.deleteUser(obj).subscribe(data => {
	// 		console.log(data)
	// 		if (data) {
	// 			this.getUserListing(this.reqData.limit, this.reqData.offset)
	// 		}
	// 	}, err => {
	// 		console.log(err)
	// 		if (err.status >= 400) {
	// 			// this.toastr.error('Internal Error', 'Error')
	// 			console.log('Invalid Credential!!!')
	// 		} else {
	// 			// this.toastr.error('Internet Connection Error', 'Error')
	// 			console.log('Internet Connection Error')
	// 		}

	// 	})
	// }

}
