import { LoadingStateType } from "../common/common.types";

export interface ServiceCenterStateTypes {
  activeSCDetails: GetSCDetailsResponse | null;
  scLoadingStates: ScLoadingStates;
  addFollowUpDetails: postScDetailsFollowUp;
}
export interface ScLoadingStates {
  getSCDetailsLoadingState: LoadingStateType;
  postSCDetailsLoadingState: LoadingStateType;
  addVerificationDetailsLoadingState: LoadingStateType;
  addFlexDetailsLoadingState: LoadingStateType;
  addPhotoGrapghyDetailsLoadingState: LoadingStateType;
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
  FLEX_INSTALLATION_COMPLETE = "FlexInstallationComplete",
  FLEX_INSTALLATION_PENDING = "FlexInstallationPending",
}
export enum VerificationStatusEnum {
  VERIFIED = "Verified",
  VERIFICATION_PENDING = "VerificationPending",
}
export enum PTOStatusEnum {
  COMPLETE = "complete",
  PENDING = "pending",
}

export enum BtnTypes {
  REGISTRATION = "Registration",
  VERIFICATION = "Verification",
  FLEX_INSTALLATION = "Flex Installation",
  PHOTOGRAPHY = "Photography",
  TRAINING = "Training & Onboarding",
}
export enum StatusTypeEnum {
  COMPLETED = "Completed",
  PENDING = "Pending",
  REJECTED = "Rejected",
  NOT_STARTED = "Not Started",
}

export interface postSCDetailsReqBody {
  salesRepId: string;
  comments?: string;
  registrationStatus: string;
  subscriptionType: string;
}
export interface postSCDetailsPayload {
  phoneNumber: string;
  serviceCenterOwnerName: string;
  serviceCenterAddress: string;
  serviceCenterName: string;
  salesRepId: string;
  registeredDate?: string;
  comments: string;
  registrationStatus: string;
  followup: postScDetailsFollowUp;
  subscriptionType: string;
}
export interface postScDetailsFollowUp {
  reason?: string;
  followUpDate: string;
}

export interface AddVerificationDetailsPayload {
  verifierName: string;
  verifierRepId: string;
  verificationStatus: string;
  flexInstallationDate?: string;
  flexDimensions?: string;
  comments: string;
  isFollowUpClicked?: boolean;
}

export interface AddVerificationDetailsReqBody
  extends AddVerificationDetailsPayload {
  phoneNumber: string;
  followup?: postScDetailsFollowUp | null;
}

export interface AddFlexDetailsPayload {
  repId: string;
  status: string;
  comments: string;
  isFollowUpClicked?: boolean;
}

export interface AddFlexDetailsReqBody extends AddFlexDetailsPayload {
  phoneNumber: string;
  followup: postScDetailsFollowUp | null;
}

export interface AddPhotoGraphyDetalsPayload {
  repId: string;
  status: string;
  comments: string;
  isFollowUpClicked?: boolean;
}
export interface AddPhotoGraphyDetalsreqBody
  extends AddPhotoGraphyDetalsPayload {
  phoneNumber: string;
  followup: postScDetailsFollowUp | null;
}
