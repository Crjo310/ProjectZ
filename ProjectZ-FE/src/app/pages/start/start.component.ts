import { Component, OnInit, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AvatarPickerComponent } from 'src/app/components/avatar-picker/avatar-picker.component';
import { Player } from 'src/app/model/models';
import { HttpService } from 'src/app/service/http-service';
import { urls } from 'src/app/util/util';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  avatarBaseUrl: string = urls.baseAvatarUrl;
  username: string = '';
  avatarId: string = '0';

  constructor(private router: Router, private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  processOK() {
    this.httpService.postRequest('player/create',{name: this.username, avatarId: this.avatarId}).subscribe({
      next: (r) => {        
        localStorage.setItem('userId', (<Player>r).id);
        localStorage.setItem('userName', (<Player>r).name);
        this.router.navigate(['/newgame']);
      },
      error: (e) => window.alert(e.error.message),
      complete: () => {}
    });
  }

  onKeyDownEvent(event: any) {
    this.username = event.target.value;
  }

  chooseAvatar(): void{
    const dialogRef = this.dialog.open(AvatarPickerComponent, {
      width: '1000px',
      height: '560px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        this.avatarId = result;
      }
    });
  }
}
