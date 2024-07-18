import { Component } from '@angular/core';
import { Icreator } from '../../../core/interfaces/creator.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  creators: Icreator[] = [
    {
      name: 'Cristian Baron',
      image: '../../../../assets/images/about/cristian.jpg',
      githubLink: 'https://github.com/gillhad',
      linkedinLink: 'https://es.linkedin.com/in/crbaronv?challengeId=AQE3VmADaO_-WQAAAZDFCAfFIRa0nxbFHaXL1vNjXDQ5h6u26gIY0T9_krbZClDtm2AuvrBaZ92hlO0M9e9TyaG-Obn6nCiUnA&submissionId=0daab8ac-7542-e317-a5f9-6eaccb40dc30&challengeSource=AgHp8DRdnpMiUgAAAZDFCBB-9z-AQwMAknpWavY-_p7dLj_27igeRcp2POSlkMY&challegeType=AgGScD7yFeXZ3AAAAZDFCBCBLSm3ANFNVsyQH74Xr5_PkU2XRhK1z14&memberId=AgGy11PRN_SAewAAAZDFCBCFh_6Bt9otoIjko7uJPqflZPU&recognizeDevice=AgGGfXPdPvEHUQAAAZDFCBCICwlMjgiq-Cl__nTPT5YFMv_JfoLT&original_referer='
    },
    {
      name: 'Eloi Pellin',
      image: '../../../../assets/images/about/eloi.jpg',
      githubLink: 'https://github.com/eloipm',
      linkedinLink: 'https://es.linkedin.com/in/eloi-pellin-593754258?original_referer=https%3A%2F%2Fwww.google.com%2F'
    }
  ];
}
