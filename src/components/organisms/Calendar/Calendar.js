import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ArrowImage } from 'images/icons/arrow.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

const StyledWrapper = styled.div`
  display: block;
  margin: 2em auto;
  padding: 1em;
  width: 100%;
  max-width: 436px;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const StyledNavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  display: block;
  height: 5em;
  width: 5em;
  padding: 0.9em;

  &svg {
    margin: auto;
  }

  ${({ left }) =>
    left &&
    css`
      transform: rotate(-180deg);
    `};
`;

const StyledDateInfo = styled.div`
  display: block;
  margin: 0 0.9em;
`;

const StyledYear = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  line-height: 1;
`;

const StyledMonthName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  line-height: 1;
`;

const StyledCalendarContainer = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
`;

const StyledWeekNamesContainer = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  padding: 0.5em;
  list-style: none;
  margin: 1em 0;
`;

const StyledWeekName = styled.li`
  display: block;
  width: 14.285%;
  height: auto;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  text-transform: uppercase;
`;

const StyledMonthDaysContainer = styled.div`
  display: block;
  margin: 0;
  width: 100%;
`;

const StyledWeekDaysContainer = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.5em;
  margin-top: 1em;
  list-style: none;
`;

const StyledDay = styled.li`
  display: block;
  width: 2.5em;
  height: 2.5em;
  line-height: 2.5em;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  text-align: center;
  text-transform: uppercase;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  background: #f0f0f0;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const Calendar = () => {
  return (
    <StyledWrapper>
      <StyledNavigationContainer>
        <StyledButtonIcon left="true">
          <ArrowImage />
        </StyledButtonIcon>
        <StyledDateInfo>
          <StyledYear>2020</StyledYear>
          <StyledMonthName>may</StyledMonthName>
        </StyledDateInfo>
        <StyledButtonIcon>
          <ArrowImage />
        </StyledButtonIcon>
      </StyledNavigationContainer>
      <StyledCalendarContainer>
        <StyledWeekNamesContainer>
          <StyledWeekName>MON</StyledWeekName>
          <StyledWeekName>TUE</StyledWeekName>
          <StyledWeekName>WED</StyledWeekName>
          <StyledWeekName>THU</StyledWeekName>
          <StyledWeekName>FRI</StyledWeekName>
          <StyledWeekName>SAT</StyledWeekName>
          <StyledWeekName>SUN</StyledWeekName>
        </StyledWeekNamesContainer>
        <StyledMonthDaysContainer>
          <StyledWeekDaysContainer>
            <StyledDay>1</StyledDay>
            <StyledDay>2</StyledDay>
            <StyledDay>3</StyledDay>
            <StyledDay>4</StyledDay>
            <StyledDay>5</StyledDay>
            <StyledDay>6</StyledDay>
            <StyledDay>7</StyledDay>
          </StyledWeekDaysContainer>
          <StyledWeekDaysContainer>
            <StyledDay>8</StyledDay>
            <StyledDay>9</StyledDay>
            <StyledDay>10</StyledDay>
            <StyledDay>11</StyledDay>
            <StyledDay>12</StyledDay>
            <StyledDay>13</StyledDay>
            <StyledDay>14</StyledDay>
          </StyledWeekDaysContainer>
          <StyledWeekDaysContainer>
            <StyledDay>15</StyledDay>
            <StyledDay>16</StyledDay>
            <StyledDay>17</StyledDay>
            <StyledDay>18</StyledDay>
            <StyledDay>19</StyledDay>
            <StyledDay>20</StyledDay>
            <StyledDay>21</StyledDay>
          </StyledWeekDaysContainer>
          <StyledWeekDaysContainer>
            <StyledDay>22</StyledDay>
            <StyledDay>23</StyledDay>
            <StyledDay>24</StyledDay>
            <StyledDay>25</StyledDay>
            <StyledDay>26</StyledDay>
            <StyledDay>27</StyledDay>
            <StyledDay>28</StyledDay>
          </StyledWeekDaysContainer>
          <StyledWeekDaysContainer>
            <StyledDay>29</StyledDay>
            <StyledDay>30</StyledDay>
            <StyledDay>31</StyledDay>
          </StyledWeekDaysContainer>
        </StyledMonthDaysContainer>
      </StyledCalendarContainer>
    </StyledWrapper>
  );
};

export default Calendar;
