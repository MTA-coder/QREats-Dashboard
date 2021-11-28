import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/pages/services/storage.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  ProfileName: string;

  constructor(private layout: LayoutService, private _storage: StorageService) {
    this.ProfileName = this._storage.getLocalObject('user').name;
  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }
}
