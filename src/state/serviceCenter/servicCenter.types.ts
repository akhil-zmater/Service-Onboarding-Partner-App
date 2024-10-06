import { LoadingStateType } from "../common/common.types";

export interface ServiceCenterStateTypes {
  activeSCDetails: GetSCDetailsResponse | null;
  scLoadingStates: ScLoadingStates;
}
export interface ScLoadingStates {
  getSCDetailsLoadingState: LoadingStateType;
}
export interface GetSCDetailsByPhoneNoReqBody {
  mobileNumber: string;
}

export interface GetSCDetailsResponse {
  phoneNumber: string;
  serviceCenterOwnerName: string;
  serviceCenterAddress: string;
  serviceCenterName: string;
  salesRepId: string;
  registeredDate: string;
  registrationComments: string;
  registrationStatus: RegistrationStatusEnum;
  subscriptionType: string;
  registrationFollowup?: any;
  verificationDetails: VerificationDetails;
  flexDetails: FlexDetails;
  photographyDetails?: PhotographyDetails;
  trainingDetails?: TrainingDetails;
  onBoardingDetails?: OnBoadingDetails;
}
interface TrainingDetails {
  status: PTOStatusEnum;
}
interface OnBoadingDetails {
  status: PTOStatusEnum;
}
interface FlexDetails {
  repId: string;
  status: FlexInstallationEnum;
  comments: string;
  phoneNumber?: any;
  followup: Followup;
}
interface PhotographyDetails {
  status: PTOStatusEnum;
}

interface Followup {
  reason: string;
  followUpDate: string;
}

interface VerificationDetails {
  verifierName: string;
  verifierRepId: string;
  verificationStatus: VerificationStatusEnum;
  flexInstallationDate: string;
  flexDimensions: string;
  comments: string;
  phoneNumber?: any;
  followup?: any;
}

export enum RegistrationStatusEnum {
  REGISTERED = "Registered",
  FOLLOWUP = "Followup",
  REJECT = "Reject",
}
export enum FlexInstallationEnum {
  FLEX_INSTALLATION_COMPLETE = "FlexInstallationcomplete",
  FLEX_INSTALLATION_PENDING = "flexInstallationPending",
}
export enum VerificationStatusEnum {
  VERIFIED = "Verified",
  VERIFICATION_PENDING = "VerificationPending",
}
export enum PTOStatusEnum {
  COMPLETE = "complete",
  PENDING = "pending",
}
